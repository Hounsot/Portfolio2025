import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { PGlite } from '@electric-sql/pglite'

test('case counters, identity isolation and database permissions', async (t) => {
  const db = new PGlite()
  const alice = '00000000-0000-0000-0000-000000000001'
  const bob = '00000000-0000-0000-0000-000000000002'
  const as = async (id) => {
    await db.exec('reset role')
    await db.query("select set_config('request.jwt.claim.sub', $1, false)", [id ?? ''])
    await db.exec(`set role ${id ? 'authenticated' : 'anon'}`)
  }
  const rpc = async (name, args) => (await db.query(`select * from public.${name}(${args.map((_, i) => `$${i + 1}`).join(',')})`, args)).rows[0]
  try {
    // Supabase owns auth in production. This reproduces its roles and JWT subject.
    await db.exec(`
      create role anon; create role authenticated;
      create schema auth;
      create table auth.users (id uuid primary key);
      create function auth.uid() returns uuid language sql stable as
        $$ select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid $$;
      grant usage on schema public, auth to anon, authenticated;
      insert into auth.users values ('${alice}'), ('${bob}');
    `)
    await db.exec(await readFile(new URL('../supabase/migrations/202610300001_case_engagement.sql', import.meta.url), 'utf8'))

    await t.test('public can read real zero totals but cannot read visitor records or write', async () => {
      await as(null)
      const { rows } = await db.query('select * from public.case_counters')
      assert.equal(rows.length, 8)
      assert.ok(rows.every((row) => Number(row.views) === 0 && Number(row.likes) === 0))
      await assert.rejects(db.exec('select * from public.case_views'), /permission denied/)
      await assert.rejects(db.exec('select * from public.case_likes'), /permission denied/)
      await assert.rejects(rpc('record_case_view', ['parametr']), /permission denied/)
      await assert.rejects(rpc('set_case_like', ['parametr', true]), /permission denied/)
    })
    await t.test('a visitor is counted only once per case per UTC day', async () => {
      await as(alice)
      assert.equal(Number((await rpc('record_case_view', ['parametr'])).views), 1)
      assert.equal(Number((await rpc('record_case_view', ['parametr'])).views), 1)
      await as(bob)
      assert.equal(Number((await rpc('record_case_view', ['parametr'])).views), 2)
      assert.equal(Number((await rpc('record_case_view', ['adc'])).views), 1)
    })
    await t.test('likes are idempotent, reversible, and isolated between visitors', async () => {
      await as(alice)
      assert.equal(Number((await rpc('set_case_like', ['parametr', true])).likes), 1)
      assert.equal(Number((await rpc('set_case_like', ['parametr', true])).likes), 1)
      await as(bob)
      assert.equal((await db.query('select * from public.case_likes')).rows.length, 0)
      assert.equal(Number((await rpc('set_case_like', ['parametr', true])).likes), 2)
      assert.ok((await db.query('select * from public.case_likes')).rows.every((row) => row.user_id === bob))
      assert.equal(Number((await rpc('set_case_like', ['parametr', false])).likes), 1)
      assert.equal(Number((await rpc('set_case_like', ['parametr', false])).likes), 1)
      await as(alice)
      assert.equal(Number((await rpc('set_case_like', ['parametr', false])).likes), 0)
      assert.equal(Number((await rpc('set_case_like', ['parametr', false])).likes), 0)
    })
    await t.test('visitor activity yesterday does not prevent a view today', async () => {
      await db.exec('reset role')
      await db.query("insert into public.case_views values ('dada', $1, (timezone('UTC', now())::date) - 1)", [alice])
      await db.exec("update public.case_counters set views = 1 where slug = 'dada'")
      await as(alice)
      assert.equal(Number((await rpc('record_case_view', ['dada'])).views), 2)
      assert.equal(Number((await rpc('record_case_view', ['dada'])).views), 2)
    })
    await t.test('clients cannot invent cases, change totals, or impersonate another visitor', async () => {
      await as(alice)
      await assert.rejects(rpc('record_case_view', ['invented']), /Unknown case/)
      await assert.rejects(rpc('set_case_like', ['invented', true]), /Unknown case/)
      await assert.rejects(rpc('set_case_like', ['parametr', null]), /Like state required/)
      await assert.rejects(db.exec("update public.case_counters set likes = 999"), /permission denied/)
      await assert.rejects(db.query("insert into public.case_likes values ('parametr', $1)", [bob]), /permission denied/)
      await db.exec('reset role')
      await db.query("select set_config('request.jwt.claim.sub', '', false)")
      await db.exec('set role authenticated')
      await assert.rejects(rpc('record_case_view', ['parametr']), /Authentication required/)
    })
  } finally { await db.close() }
})
