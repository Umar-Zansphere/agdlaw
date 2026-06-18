const { defineConfig, devices } = require("@playwright/test");
require('dotenv').config();

const PORT = process.env.PORT || "3000";
const HOST = process.env.HOST || "127.0.0.1";
const baseURL = `http://${HOST}:${PORT}`;
const emailReportPath =
  process.env.PLAYWRIGHT_HTML_EMAIL_REPORT ||
  "test-results/e2e-email-report.html";

module.exports = defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
  ["list"],

  ["html", { open: "never" }],

  ["junit", { outputFile: "test-results/e2e-junit.xml" }],

  [
    "./tests/e2e/reporters/email-html-reporter.js",
    { outputFile: emailReportPath, baseURL },
  ],

  [
    "@reportportal/agent-js-playwright",
    {
      endpoint: "http://localhost:9090/api/v1",
      apiKey: process.env.RP_API_KEY,
      project: "agdlaw",
      launch: "AGDLAW Frontend E2E",
      description: "Playwright frontend e2e test",
      attributes: [

      {
        key: "framework",
        value: "playwright",
      },

      {
        key: "suite",
        value: "e2e",
      },

      {
        key: "app",
        value: "agdlaw",
      },

      {
        key: "layer",
        value: "frontend",
      },

      {
        key: "env",
        value: "qa",
      },

      {
        key: "team",
        value: "qa",
      }

    ],
    },
  ],
],
  use: {
    baseURL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],
  webServer: {
    command: `pnpm exec next dev --hostname ${HOST} --port ${PORT}`,
    // command: `npm run dev -- --hostname ${HOST} --port ${PORT}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
// console.log(process.env.RP_API_KEY)