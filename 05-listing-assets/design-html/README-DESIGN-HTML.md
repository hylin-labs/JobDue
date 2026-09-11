# JobDue Design HTML Assets

These files create static HTML marketing assets for JobDue marketplace listings and Remotion video frames.

## Files

- `index.html` - visual index linking to all assets.
- `cover-image.html` - main marketplace cover.
- `gumroad-gallery.html` - six Gumroad preview graphics.
- `etsy-gallery.html` - ten Etsy gallery graphics.
- `how-it-works.html` - buyer setup graphic.
- `backup-explainer.html` - local storage and backup/import explanation.
- `no-login-no-subscription.html` - high-impact trust graphic.
- `video-frames.html` - Remotion intro/outro/callout frames.
- `styles.css` - shared B5D Steel Teal / Cool Mist design system.

## Regenerate Exports

Run from `project-materials/`:

```powershell
npm run export:design-assets
```

If you are running outside Codex and the command says Playwright is missing, run:

```powershell
npm install
```

On this Codex Windows machine, the script can also fall back to Codex's bundled Playwright runtime.

Exports go to:

- `listing-materials/02-graphics/exported/png/`
- `listing-materials/02-graphics/exported/jpg/`
- `listing-materials/03-video/remotion/public/design-frames/`

These are marketing/listing assets. They do not replace the real app.
