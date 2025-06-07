// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { trace } from 'node:console';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  timeout: 40 * 1000,
  expect: {
    timeout: 5000,
  },
  reporter: 'html',
  projects: [
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        // browserName: 'firefox',
        headless: false,
        screenshot: 'on',
        // trace: 'on',  - if we want all screenshots, 'off' - for no screenschots
        trace: 'retain-on-failure',
        launchOptions: {
          args: ['--start-maximized'],
        },
        viewport: null,
      }
    },

  ],
});

export default config;

// npx playwright test tests/UABasicstests.spec.js --debug