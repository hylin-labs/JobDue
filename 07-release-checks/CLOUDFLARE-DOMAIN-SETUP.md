# Cloudflare Production Domain Check

Before publishing this release, create one Cloudflare **Single Redirect** rule:

- If: hostname equals `craniai.com`
- Then: static URL redirect to `https://www.craniai.com/$1`
- Status code: `301`
- Preserve query string: enabled

This keeps `https://www.craniai.com/` as the only canonical host. The site already declares that canonical host in its metadata and sitemap.

The deployed `_headers` file adds HSTS and baseline browser security headers for static asset responses. Verify them after deployment with:

```text
curl -I https://www.craniai.com/
curl -I https://craniai.com/
```

Expected result:

- `www` returns `200 OK` with the configured security headers.
- non-`www` returns `301` with a `Location` header pointing to the same path on `www`.
