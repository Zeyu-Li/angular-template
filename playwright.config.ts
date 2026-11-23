import { defineConfig, devices } from '@playwright/test';

const port: number = Number(process.env['PORT'] ?? 4200);
const baseURL = `http://localhost:${port}`;

export default defineConfig({
  testDir: './e2e',
  forbidOnly: !!process.env['CI'],
  retries: process.env['CI'] ? 2 : 0,
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: `yarn start --port ${port}`,
    url: baseURL,
    reuseExistingServer: !process.env['CI'],
  },
});
