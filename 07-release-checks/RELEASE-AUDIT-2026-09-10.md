# JobDue Release Audit

Date: 2026-09-10

## Scope

- Public landing page and Product Guide
- Public images, posters, and MP4 videos
- JobDue browser app/PWA smoke flow
- SEO metadata and Cloudflare static-assets configuration

## Findings Resolved

- Replaced public stills that visibly used the old CollectDesk name with fresh US-English captures from `02-app-pwa/JobDue.html`.
- Added a new JobDue buyer-package visual for the Product Guide.
- Corrected canonical URLs, Open Graph URLs/images, structured data, sitemap, robots file, and `llms.txt` to use `https://www.craniai.com`.
- Updated screenshot capture paths so they are reproducible from this publication repository.

## Visual Review

- `JobDueFinalLaunchVideo.mp4`: JobDue branding confirmed.
- `iPhone-iPad-Setup-Video.mp4`: JobDue branding confirmed.
- `Android-Setup-Video.mp4`: JobDue branding confirmed.
- Hero, product-tour, and Product Guide stills: JobDue branding confirmed.
- Responsive landing screenshots captured at 1440, 1512, 1024, 390, and 360 CSS pixels.

## Automated Checks

- `node 07-release-checks/audit-landing.js`
  - Passed five landing-page viewports.
  - Confirmed no horizontal overflow, no broken public images, no rendered old brand text, and Stripe checkout links.
  - Confirmed Product Guide Included-tab interaction.
- `node 07-release-checks/audit-app.js`
  - Passed JobDue header branding, add-job, JSON backup export, and delete-job flow.

## Release Status

Ready for GitHub push and Cloudflare deployment.
