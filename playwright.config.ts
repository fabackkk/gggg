import { defineConfig, devices } from "@playwright/test";
import { existsSync } from "node:fs";

const chromiumPath =
  process.env["CHROMIUM_EXECUTABLE_PATH"] ?? "/usr/bin/chromium";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  workers: 2,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:4200",
    launchOptions: existsSync(chromiumPath)
      ? { executablePath: chromiumPath, args: ["--no-sandbox"] }
      : {},
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "desktop",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1440, height: 1000 },
      },
    },
    {
      name: "mobile",
      use: { ...devices["iPhone 13"], defaultBrowserType: "chromium" },
    },
  ],
  webServer: {
    command: "npm start",
    url: "http://127.0.0.1:4200",
    reuseExistingServer: !process.env["CI"],
    timeout: 60000,
  },
});
