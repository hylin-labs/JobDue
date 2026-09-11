# JobDue Local QA Summary

## Current Build

- Cloudflare ZIP: `release/jobdue/cloudflare-pages-jobdue-posix-20260604-063825.zip`
- Buyer ZIP: `release/jobdue/buyer-package/JobDue-Buyer-Package.zip`

## What Changed

- Landing and Product Guide text are rebranded to JobDue.
- Existing approved screenshots, guide images, posters, and screenshot thumbnails are preserved.
- Existing image assets are copied with JobDue filenames where the HTML needs renamed paths.
- MP4 videos are regenerated from JobDue-branded frames and real JobDue app screenshots.
- The logo/icon set is replaced with a new JobDue JD mark.

## Checks Completed

- Legacy public text audit passed.
- ZIP path audit passed: no Windows backslash paths.
- Cloudflare file-size audit passed: no files over 25 MB.
- Landing asset audit passed: `index.html` and `infographics.html` have no missing local asset references.
- Key screenshots preserve the current approved landing visual source.
- MP4 videos use new JobDue-branded visual source.

## Remaining

- Replace `https://gumroad.com/l/jobdue-launch-placeholder` with the final JobDue checkout URL.
- Replace `https://app.hi-craniai.workers.dev` if you choose a final domain.
- Decide later whether embedded old-brand text inside still screenshots should be edited or regenerated.
