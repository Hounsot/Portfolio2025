import { readFile, mkdir, copyFile, writeFile } from 'node:fs/promises'

// GitHub Pages serves files directly, so every client route needs an entry page.
const source = await readFile(new URL('../src/data/projects.ts', import.meta.url), 'utf8')
const routes = ['wall', ...Array.from(source.matchAll(/slug:\s*'([^']+)'/g), ([, slug]) => `work/${slug}`)]
const dist = new URL('../dist/', import.meta.url)
for (const route of routes) {
  const directory = new URL(`${route}/`, dist)
  await mkdir(directory, { recursive: true })
  await copyFile(new URL('index.html', dist), new URL('index.html', directory))
}
await copyFile(new URL('index.html', dist), new URL('404.html', dist))
await writeFile(new URL('.nojekyll', dist), '')
console.log(`Generated ${routes.length} GitHub Pages route entries.`)
