const { chromium } = require('playwright');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const appFile = path.join(repoRoot, '02-app-pwa', 'JobDue.html');
const appUrl = 'file:///' + appFile.replace(/\\/g, '/') + '?demo=1';

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, locale: 'en-US', timezoneId: 'America/Los_Angeles', acceptDownloads: true });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('dialog', dialog => dialog.accept());
  await page.goto(appUrl, { waitUntil: 'load' });
  await page.waitForTimeout(250);

  assert(await page.locator('.brand-title').textContent() === 'JobDue', 'app: header brand is not JobDue');
  assert(!(await page.locator('body').innerText()).includes('CollectDesk'), 'app: old brand text rendered');

  await page.locator('button[data-action="new-job"]').first().click();
  await page.locator('input[name="clientName"]').fill('QA Test Client');
  await page.locator('input[name="jobType"]').fill('QA test job');
  await page.getByRole('button', { name: 'Save Job' }).click();
  await page.locator('button[data-action="set-tab"][data-value="Jobs"]').first().click();
  assert(await page.getByText('QA Test Client', { exact: true }).count() > 0, 'app: saved job is not visible');

  await page.locator('button[data-action="set-tab"][data-value="Data"]').first().click();
  const downloadPromise = page.waitForEvent('download');
  await page.locator('button[data-action="export-backup"]').first().click();
  const download = await downloadPromise;
  assert(download.suggestedFilename().endsWith('.json'), 'app: backup export is not JSON');

  const testRow = page.getByText('QA Test Client', { exact: true });
  await testRow.locator('xpath=ancestor::tr').getByRole('button', { name: 'Edit' }).click();
  await page.getByRole('button', { name: 'Delete Job' }).click();
  assert(await page.getByText('QA Test Client', { exact: true }).count() === 0, 'app: deleted job remains visible');
  assert(errors.length === 0, `app: page errors ${errors.join(' | ')}`);

  await browser.close();
  console.log('PASS: JobDue add, export JSON backup, and delete flow');
})().catch(async error => {
  console.error(error.stack || error.message);
  process.exit(1);
});
