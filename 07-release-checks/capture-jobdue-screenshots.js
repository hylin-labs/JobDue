
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const repoRoot = path.resolve(__dirname, '..');
  const appFile = path.join(repoRoot, '02-app-pwa', 'JobDue.html');
  const outDir = path.join(repoRoot, '05-listing-assets', 'screenshots');
  const logoFile = path.join(repoRoot, '01-brand-system', 'jobdue-logo-source.png');
  const logoDataUri = 'data:image/png;base64,' + fs.readFileSync(logoFile).toString('base64');
  const pageUrl = 'file:///' + appFile.replace(/\\/g, '/') + '?demo=1';
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 2,
    locale: 'en-US',
    timezoneId: 'America/Los_Angeles'
  });
  await page.goto(pageUrl, { waitUntil: 'load' });
  await page.waitForTimeout(1000);
  const tabs = ['Today', 'Jobs', 'Money', 'Data'];
  for (const tab of tabs) {
    if (tab !== 'Today') {
      await page.locator(`button[data-action="set-tab"][data-value="${tab}"]`).first().click();
      await page.waitForTimeout(500);
    }
    await page.screenshot({ path: path.join(outDir, 'jobdue-' + tab.toLowerCase() + '-desktop-2x.png'), fullPage: false });
  }

  const includedPage = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 2,
    locale: 'en-US'
  });
  await includedPage.setContent(`<!doctype html><html><head><style>
    * { box-sizing: border-box; }
    body { margin: 0; min-height: 100vh; font-family: Arial, sans-serif; color: #10252d; background: #edf4f5; }
    main { min-height: 100vh; padding: 72px; background: linear-gradient(135deg, #eff7f7 0 70%, #dceef0 70%); }
    .brand { display: flex; align-items: center; gap: 18px; color: #126f76; font-size: 30px; font-weight: 800; }
    .brand-logo { width: 64px; height: 64px; object-fit: contain; }
    h1 { max-width: 800px; margin: 38px 0 12px; font-size: 68px; line-height: 1.02; letter-spacing: -2px; }
    .lead { max-width: 680px; margin: 0; color: #52666c; font-size: 28px; line-height: 1.4; }
    .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 22px; margin-top: 56px; }
    .card { min-height: 340px; padding: 30px; border: 2px solid #d2e0e3; border-radius: 24px; background: #fff; box-shadow: 0 16px 36px rgba(16, 37, 45, .08); }
    .number { display: inline-grid; width: 42px; height: 42px; place-items: center; border-radius: 50%; background: #dceff0; color: #126f76; font-size: 20px; font-weight: 800; }
    h2 { margin: 72px 0 12px; font-size: 30px; line-height: 1.15; }
    .card p { margin: 0; color: #52666c; font-size: 21px; line-height: 1.4; }
    footer { display: flex; align-items: center; justify-content: space-between; margin-top: 52px; padding-top: 26px; border-top: 2px solid #c9dfe1; color: #126f76; font-size: 22px; font-weight: 700; }
  </style></head><body><main><div class="brand"><img class="brand-logo" src="${logoDataUri}" alt=""><span>JobDue</span></div><h1>Everything you need to get moving.</h1><p class="lead">One download for tracking jobs, following up, and keeping a backup of your records.</p><section class="grid"><article class="card"><span class="number">1</span><h2>JobDue app</h2><p>Your no-login job, payment, and follow-up tracker.</p></article><article class="card"><span class="number">2</span><h2>Setup guides</h2><p>Clear desktop, iPhone, iPad, and Android steps.</p></article><article class="card"><span class="number">3</span><h2>Backup guide</h2><p>Simple export and import instructions for your data.</p></article><article class="card"><span class="number">4</span><h2>Sample data</h2><p>Explore the workflow before adding your own jobs.</p></article></section><footer><span>Track jobs. Follow up. Get paid.</span><span>One-time digital product</span></footer></main></body></html>`);
  await includedPage.screenshot({ path: path.join(outDir, 'jobdue-included-desktop-2x.jpg'), type: 'jpeg', quality: 92, fullPage: false });
  await includedPage.close();
  await browser.close();
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
