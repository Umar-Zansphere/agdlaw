const { test, expect } = require("@playwright/test");

async function gotoHomepage(page) {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { level: 1, name: /agd law/i })
  ).toBeVisible();
}

test.describe("homepage UI regressions", () => {
  test("renders the major homepage sections and supports anchor navigation", async ({
    page,
  }) => {
    await gotoHomepage(page);
    const mainNav = page.getByRole("navigation", { name: "Main navigation" });

    await expect(
      page.getByRole("heading", { level: 2, name: /your legal matter/i })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 2, name: /areas of expertise/i })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 2, name: /the counsel behind/i })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 2, name: /results that speak/i })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 2, name: /from our desk/i })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 2, name: /common questions/i })
    ).toBeVisible();

    await mainNav.getByRole("link", { name: "Services" }).click();
    await expect(page).toHaveURL(/#services$/);

    await page.getByRole("link", { name: "Request Consultation" }).click();
    await expect(page).toHaveURL(/#contact$/);

    await mainNav.getByRole("link", { name: "About" }).click();
    await expect(page).toHaveURL(/#about$/);
  });

  test("navigates from homepage cards and buttons to service and blog pages", async ({
    page,
  }) => {
    await gotoHomepage(page);

    await page.getByRole("link", { name: /^all articles/i }).click();
    await expect(page).toHaveURL(/\/blog$/);
    await expect(
      page.getByRole("heading", { level: 1, name: /from our desk/i })
    ).toBeVisible();

    await page.goto("/");
    await expect(
      page.getByRole("link", { name: /criminal law bail, criminal trials/i })
    ).toBeVisible();
    await page
      .getByRole("link", { name: /criminal law bail, criminal trials/i })
      .click();
    await expect(page).toHaveURL(/\/services\/criminal-law$/);
    await expect(
      page.getByRole("heading", { level: 1, name: /criminal law/i })
    ).toBeVisible();

    await page.goto("/");
    await page
      .getByRole("link", {
        name: /anticipatory bail in india: what it is and when you need it/i,
      })
      .click();
    await expect(page).toHaveURL(/\/blog\/anticipatory-bail-guide-india$/);
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /anticipatory bail in india/i,
      })
    ).toBeVisible();
  });

  test("toggles FAQ answers and testimonial slides", async ({ page }) => {
    await gotoHomepage(page);
    const testimonialSection = page.locator("#testimonial");

    const faqButton = page.getByRole("button", {
      name: /what forums do you represent clients before\?/i,
    });

    await expect(faqButton).toHaveAttribute("aria-expanded", "false");
    await faqButton.click();
    await expect(faqButton).toHaveAttribute("aria-expanded", "true");
    await expect(
      page.getByText(/madras high court, district courts/i)
    ).toBeVisible();
    await faqButton.click();
    await expect(faqButton).toHaveAttribute("aria-expanded", "false");

    await expect(testimonialSection.getByText("01 / 02")).toBeVisible();
    await expect(
      testimonialSection.locator(".testi-name").filter({ hasText: "AGD Bala Kumar" })
    ).toBeVisible();
    await testimonialSection.getByRole("button", { name: "Next" }).click();
    await expect(testimonialSection.getByText("02 / 02")).toBeVisible();
    await expect(
      testimonialSection
        .locator(".testi-name")
        .filter({ hasText: "AGD Law Associates" })
    ).toBeVisible();
    await testimonialSection.getByRole("button", { name: "Previous" }).click();
    await expect(testimonialSection.getByText("01 / 02")).toBeVisible();
    await expect(
      testimonialSection.locator(".testi-name").filter({ hasText: "AGD Bala Kumar" })
    ).toBeVisible();
  });

  test("supports the mobile menu and section navigation on small screens", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await gotoHomepage(page);

    const toggleButton = page.getByRole("button", { name: "Toggle menu" });
    await expect(toggleButton).toBeVisible();
    await expect(toggleButton).toHaveAttribute("aria-expanded", "false");

    await toggleButton.click();
    await expect(toggleButton).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByRole("link", { name: /services 02/i })).toBeVisible();

    await page.getByRole("link", { name: /services 02/i }).click();
    await expect(page).toHaveURL(/#services$/);
    await expect(toggleButton).toHaveAttribute("aria-expanded", "false");
  });

  test("opens and sends the WhatsApp widget message through the expected URL", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      window.__openCalls = [];
      window.open = (...args) => {
        window.__openCalls.push(args);
        return null;
      };
    });

    await gotoHomepage(page);

    await page.getByRole("button", { name: "Open chat" }).click();
    await expect(page.getByText("AGD Legal Desk")).toBeVisible();

    await page
      .getByRole("button", {
        name: "I need support in a property dispute.",
      })
      .click();
    await expect(page.getByLabel("WhatsApp message")).toHaveValue(
      "I need support in a property dispute."
    );

    await page.getByRole("button", { name: "Send", exact: true }).click();

    const openCalls = await page.evaluate(() => window.__openCalls);
    expect(openCalls).toHaveLength(1);
    expect(openCalls[0][0]).toContain("https://wa.me/919994388855?text=");
    expect(openCalls[0][0]).toContain(
      encodeURIComponent("I need support in a property dispute.")
    );

    await expect(page.getByRole("button", { name: "Open chat" })).toBeVisible();
    await expect(page.getByText("Chat with AGD")).toBeVisible();
  });
});
