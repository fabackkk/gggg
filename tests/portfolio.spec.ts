import { test, expect } from "@playwright/test";
import { readFile } from "node:fs/promises";

test("loads four projects and local artwork without runtime errors or horizontal overflow", async ({
  page,
}, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("response", (response) => {
    if (response.status() >= 400)
      errors.push(`${response.status()} ${response.url()}`);
  });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Сложное",
  );
  await expect(page.locator(".project-card")).toHaveCount(4);
  for (const image of await page.locator("img").all()) {
    await image.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        image.evaluate(
          (element: HTMLImageElement) =>
            element.complete && element.naturalWidth > 0,
        ),
      )
      .toBe(true);
  }
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: `test-results/${testInfo.project.name}-full.png`,
    fullPage: true,
  });
  expect(errors).toEqual([]);
});

test("filters projects by category and restores the complete gallery", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Интерфейсы", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(2);
  await expect(
    page.getByRole("button", { name: "Интерфейсы", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Веб-дизайн", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(1);
  await expect(
    page.getByRole("button", { name: "Открыть проект Forma", exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Обложки", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(1);
  await expect(
    page.getByRole("button", { name: "Открыть проект Вне кадра", exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Все проекты" }).click();
  await expect(page.locator(".project-card")).toHaveCount(4);
});

test("opens every case study with the corresponding content and closes it", async ({
  page,
}) => {
  await page.goto("/");
  for (const name of ["DSTU Connect", "Orbit", "Forma", "Вне кадра"]) {
    await page
      .getByRole("button", { name: `Открыть проект ${name}`, exact: true })
      .click();
    const dialog = page.getByRole("dialog", { name, exact: true });
    await expect(dialog).toBeVisible();
    await expect(dialog.locator(".case-details article")).toHaveCount(3);
    await expect(dialog.getByText("01 / ЗАДАЧА")).toBeVisible();
    if (name !== "DSTU Connect")
      await expect(dialog.getByText("Демонстрационный концепт")).toBeVisible();
    await dialog.getByRole("button", { name: "Закрыть проект" }).click();
    await expect(dialog).not.toBeVisible();
    await expect(
      page.getByRole("button", { name: `Открыть проект ${name}`, exact: true }),
    ).toBeFocused();
  }
});

test("Escape closes a case and restores page scrolling", async ({ page }) => {
  await page.goto("/");
  await page
    .getByRole("button", { name: "Открыть проект DSTU Connect" })
    .click();
  await expect(page.getByRole("dialog")).toBeVisible();
  expect(await page.evaluate(() => document.body.style.overflow)).toBe(
    "hidden",
  );
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  expect(await page.evaluate(() => document.body.style.overflow)).toBe("");
});

test("brief validates required fields and downloads the entered details", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("button", { name: "Или сначала составить бриф" })
    .click();
  const dialog = page.getByRole("dialog", { name: "Какая у вас идея?" });
  await expect(dialog).toBeVisible();
  await dialog.getByRole("button", { name: "Скачать бриф" }).click();
  await expect(dialog.getByRole("status")).not.toBeVisible();
  expect(
    await dialog
      .locator('input[name="name"]')
      .evaluate((element: HTMLInputElement) => element.validity.valueMissing),
  ).toBe(true);
  await dialog.getByLabel("Как вас зовут").fill("Алексей");
  await dialog.getByLabel("Как с вами связаться").fill("@testclient");
  await dialog.getByLabel("Что будем создавать?").selectOption("Сайт");
  await dialog
    .getByLabel("Расскажите о задаче")
    .fill("Нужен сайт для небольшой студии архитектуры.");
  const downloading = page.waitForEvent("download");
  await dialog.getByRole("button", { name: "Скачать бриф" }).click();
  const download = await downloading;
  expect(download.suggestedFilename()).toBe("brief-kirill-sorokin.txt");
  const path = await download.path();
  expect(path).toBeTruthy();
  const content = await readFile(path!, "utf8");
  expect(content).toContain("Имя: Алексей");
  expect(content).toContain("Контакт: @testclient");
  expect(content).toContain("Тип проекта: Сайт");
  expect(content).toContain("Нужен сайт для небольшой студии архитектуры.");
  await expect(dialog.getByRole("status")).toContainText("Бриф подготовлен");
  await dialog.getByRole("button", { name: "Закрыть бриф" }).click();
  await expect(dialog).not.toBeVisible();
});

test("navigation reaches sections and contact links use the supplied Telegram account", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  if (testInfo.project.name === "mobile") {
    await page.getByRole("button", { name: "Открыть меню" }).click();
    await expect(
      page.getByRole("button", { name: "Закрыть меню" }),
    ).toHaveAttribute("aria-expanded", "true");
    await page
      .getByRole("navigation", { name: "Мобильная навигация" })
      .getByRole("link", { name: "Обо мне" })
      .click();
    await expect(
      page.getByRole("navigation", { name: "Мобильная навигация" }),
    ).not.toBeVisible();
  } else {
    await page
      .getByRole("navigation", { name: "Основная навигация" })
      .getByRole("link", { name: "Обо мне" })
      .click();
  }
  await expect(page).toHaveURL(/#about$/);
  await expect(
    page.getByRole("heading", {
      name: "Хороший дизайн начинается с понимания.",
    }),
  ).toBeInViewport();
  const links = page.locator('a[href^="https://t.me/"]');
  expect(await links.count()).toBeGreaterThanOrEqual(4);
  for (const link of await links.all()) {
    await expect(link).toHaveAttribute("href", "https://t.me/fabakc");
    await expect(link).toHaveAttribute("rel", "noopener noreferrer");
  }
});
