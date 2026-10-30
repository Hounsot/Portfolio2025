# Matvey Vasilyev — Portfolio

Interactive product design portfolio with a reel and case study view, an image wall, focus mode, and image previews.

Live website: https://zaum.xyz

## Local development

Requires Node.js 22 and pnpm 10.34.3.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

## Build and publication

```sh
pnpm build
```

The production website is generated in `dist/`, including entry pages for direct links to cases and the wall. Pushing to `main` builds and publishes it through the GitHub Pages workflow. The custom domain is configured in `public/CNAME`.
