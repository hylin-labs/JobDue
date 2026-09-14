const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const landingDir = path.join(repoRoot, '03-landing');
const outputDir = path.join(__dirname, 'visual-audit');
const pageUrl = 'file:///' + path.join(landingDir, 'index.html').replace(/\\/g, '/');
const guideUrl = 'file:///' + path.join(landingDir, 'infographics.html').replace(/\\/g, '/');
const viewports = [
  ['desktop-1440', 1440, 900],
  ['mac-1512', 1512, 982],
  ['tablet-1024', 1024, 768],
  ['mobile-390', 390, 844],
  ['mobile-360', 360, 800]
];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

(async () => {
  fs.mkdirSync(outputDir, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const failures = [];

  for (const [name, width, height] of viewports) {
    const page = await browser.newPage({ viewport: { width, height }, locale: 'en-US', timezoneId: 'America/Los_Angeles' });
    const pageErrors = [];
    page.on('pageerror', error => pageErrors.push(error.message));
    await page.route('https://www.googletagmanager.com/**', route => route.abort());
    await page.goto(pageUrl, { waitUntil: 'load' });
    await page.waitForTimeout(250);
    await page.evaluate(() => document.querySelectorAll('img[loading="lazy"]').forEach(image => { image.loading = 'eager'; }));
    await page.waitForFunction(() => Array.from(document.images).every(image => image.complete));
    await page.screenshot({ path: path.join(outputDir, `${name}.png`), fullPage: true });
    if (name === 'desktop-1440') {
      await page.locator('.showcase-panel').screenshot({ path: path.join(outputDir, 'product-tour-preview.png') });
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    const state = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth > window.innerWidth,
      brokenImages: Array.from(document.images).filter(image => !image.complete || !image.naturalWidth).map(image => image.currentSrc || image.src),
      oldBrandText: document.body.innerText.includes('CollectDesk'),
      stripeLinks: Array.from(document.querySelectorAll('a[href*="buy.stripe.com"]')).length,
      heading: document.querySelector('h1')?.textContent?.trim()
    }));

    if (width <= 1080) {
      const menuToggle = page.locator('[data-menu-toggle]');
      await menuToggle.click();
      const menuState = await page.evaluate(() => ({
        expanded: document.querySelector('[data-menu-toggle]')?.getAttribute('aria-expanded'),
        visible: document.getElementById('primary-navigation')?.classList.contains('is-open'),
        links: Array.from(document.querySelectorAll('#primary-navigation a:not(.button)')).length
      }));
      assert(menuState.expanded === 'true', `${name}: mobile menu did not announce expanded state`);
      assert(menuState.visible, `${name}: mobile menu did not open`);
      assert(menuState.links === 5, `${name}: mobile menu is missing navigation links`);
      if (name === 'mobile-390') {
        await page.screenshot({ path: path.join(outputDir, 'mobile-menu-open.png') });
      }
      await page.keyboard.press('Escape');
      assert(await menuToggle.getAttribute('aria-expanded') === 'false', `${name}: mobile menu did not close with Escape`);
    }

    try {
      assert(!state.overflow, `${name}: horizontal overflow`);
      assert(state.brokenImages.length === 0, `${name}: broken images ${state.brokenImages.join(', ')}`);
      assert(!state.oldBrandText, `${name}: old brand text rendered`);
      assert(state.stripeLinks >= 2, `${name}: missing Stripe checkout links`);
      assert(state.heading === 'Stop running jobs from texts, notes, and memory.', `${name}: unexpected hero heading`);
      assert(pageErrors.length === 0, `${name}: page errors ${pageErrors.join(' | ')}`);
    } catch (error) {
      failures.push(error.message);
    }
    await page.close();
  }

  const guide = await browser.newPage({ viewport: { width: 1440, height: 900 }, locale: 'en-US' });
  await guide.route('https://www.googletagmanager.com/**', route => route.abort());
  await guide.goto(guideUrl, { waitUntil: 'load' });
  await guide.evaluate(() => document.querySelectorAll('img[loading="lazy"]').forEach(image => { image.loading = 'eager'; }));
  await guide.waitForFunction(() => Array.from(document.images).every(image => image.complete));
  await guide.getByRole('tab', { name: 'Included' }).click();
  await guide.waitForTimeout(280);
  await guide.getByRole('tab', { name: 'Included' }).press('ArrowLeft');
  await guide.waitForTimeout(280);
  const keyboardState = await guide.evaluate(() => ({
    activeTitle: document.querySelector('.guide-slide.is-active')?.getAttribute('data-title'),
    activeSlideHidden: document.querySelector('.guide-slide.is-active')?.getAttribute('aria-hidden'),
    activeTab: document.querySelector('.thumb-button[aria-selected="true"]')?.textContent?.trim()
  }));
  await guide.getByRole('tab', { name: 'Included' }).click();
  await guide.waitForTimeout(280);
  await guide.screenshot({ path: path.join(outputDir, 'product-guide-included.png'), fullPage: true });
  const guideState = await guide.evaluate(() => ({
    activeTitle: document.querySelector('.guide-slide.is-active')?.getAttribute('data-title'),
    brokenImages: Array.from(document.images).filter(image => !image.complete || !image.naturalWidth).map(image => image.currentSrc || image.src),
    oldBrandText: document.body.innerText.includes('CollectDesk')
  }));
  try {
    assert(guideState.activeTitle === 'What is included', 'guide: Included tab did not activate');
    assert(guideState.brokenImages.length === 0, `guide: broken images ${guideState.brokenImages.join(', ')}`);
    assert(!guideState.oldBrandText, 'guide: old brand text rendered');
    assert(keyboardState.activeTitle === 'Data and backup', 'guide: ArrowLeft did not select the previous guide tab');
    assert(keyboardState.activeSlideHidden === 'false', 'guide: active slide is hidden from assistive technology');
    assert(keyboardState.activeTab === 'Backup', 'guide: keyboard focus did not update the active tab');
  } catch (error) {
    failures.push(error.message);
  }
  await guide.close();
  await browser.close();

  if (failures.length) {
    console.error(failures.join('\n'));
    process.exit(1);
  }
  console.log(`PASS: ${viewports.length} landing viewports and product guide interaction`);
})().catch(error => {
  console.error(error.stack || error.message);
  process.exit(1);
});
