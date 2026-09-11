
const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const appFile = "C:\\Users\\hungy\\Documents\\Codex\\contractor-tracker\\project-materials\\rebrand\\jobdue\\02-app-pwa\\JobDue.html";
  const outDir = "C:\\Users\\hungy\\Documents\\Codex\\contractor-tracker\\project-materials\\rebrand\\jobdue\\05-listing-assets\\screenshots";
  const pageUrl = 'file:///' + appFile.replace(/\\/g, '/') + '?demo=1';
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 2 });
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
  await browser.close();
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
