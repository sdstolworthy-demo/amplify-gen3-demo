# amplify-gen3-demo

A small Next.js app built to make Amplify Gen 3 features visible on a screen:

- `/` shows the build's **version**, commit and branch at booth size, read from `version.json`
  and the build environment. Change `version.json` to make a new deployment visibly different.
- `/isr` renders a **generated-at clock** from a cache entry tagged `clock`. It stays fixed
  across reloads until `aws amplifygen3 cache revalidate --tag clock`.
- `.github/workflows/deploy.yml` builds in GitHub Actions with OIDC credentials and deploys
  the built artifact with `aws amplifygen3 deploy --prebuilt`.

Deployed with `aws amplifygen3 create` / `deploy`. No secrets live in this repository.
