import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/mobile',
  use: {
    baseURL: 'https://www.saucedemo.com',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  reporter: [
    ['html', { outputFolder: 'playwright-report-mobile', open: 'never' }],
    ['list'],
    ['allure-playwright', {
    detail: true,
    resultsDir: 'allure-results/mobile',
    suiteTitle: false,
    environmentInfo: {
        OS: process.platform, // ให้ Node.js ดึงชื่อ OS ของเครื่องมาใส่อัตโนมัติ
        Node_Version: process.version, // ดึงเวอร์ชัน Node อัตโนมัติ
        Environment: 'QA (Staging)',
        Project_Name: 'SauceDemo Portfolio',
        QA_Engineer: 'Wissarut (Bank)'
      },
  }]
  ],
  projects: [
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
});