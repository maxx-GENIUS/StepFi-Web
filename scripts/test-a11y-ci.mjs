import { chromium } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';

async function runA11yAudit() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const routes = ['/', '/docs', '/contracts'];
  let violationCount = 0;

  for (const route of routes) {
    await page.goto(http://localhost:3000);
    const results = await new AxeBuilder({ page }).analyze();
    if (results.violations.length > 0) {
      console.error(Accessibility violations on :, results.violations);
      violationCount += results.violations.length;
    }
  }

  await browser.close();
  if (violationCount > 0) {
    console.error(Total accessibility violations: );
    process.exit(1);
  }
  console.log('All accessibility audits passed successfully.');
}

runA11yAudit();