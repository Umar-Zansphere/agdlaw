const { test, expect } = require("@playwright/test");

async function gotoHomepage(page) {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { level: 1, name: /agd law/i })
  ).toBeVisible();
}

async function expectSectionHeading(page, sectionId, headingName) {
  const section = page.locator(sectionId);

  await expect(section).toBeVisible();
  await expect(
    section.getByRole("heading", { level: 2, name: headingName })
  ).toBeVisible();
}

test.describe("homepage UI regressions", () => {
  test("renders the current homepage sections and supports anchor navigation", async ({
    page,
  }) => {
    await gotoHomepage(page);
    const mainNav = page.getByRole("navigation", { name: "Main navigation" });

    await expectSectionHeading(page, "#about", /your legal matter/i);
    await expectSectionHeading(page, "#services", /areas of expertise/i);
    await expectSectionHeading(page, "#team", /advocates in practice/i);
    await expectSectionHeading(
      page,
      "#why-me",
      /area of practice in specific courts/i
    );
    await expectSectionHeading(page, "#blog", /from our desk/i);
    await expectSectionHeading(page, "#faq", /common questions/i);
    await expectSectionHeading(page, "#contact", /need legal support/i);

    await mainNav.getByRole("link", { name: "Services" }).click();
    await expect(page).toHaveURL(/#services$/);

    await mainNav.getByRole("link", { name: "Team" }).click();
    await expect(page).toHaveURL(/#team$/);

    await mainNav.getByRole("link", { name: "Insights" }).click();
    await expect(page).toHaveURL(/#blog$/);

    await page
      .locator("#hero")
      .getByRole("link", { name: /request consultation/i })
      .click();
    await expect(page).toHaveURL(/#contact$/);

    await mainNav.getByRole("link", { name: "About" }).click();
    await expect(page).toHaveURL(/#about$/);
  });

  test("navigates from homepage cards and buttons to service and blog pages", async ({
    page,
  }) => {
    await gotoHomepage(page);

    await page
      .locator("#blog")
      .getByRole("link", { name: /^all articles/i })
      .click();
    await expect(page).toHaveURL(/\/blog$/);
    await expect(
      page.getByRole("heading", { level: 1, name: /from our desk/i })
    ).toBeVisible();

    await page.goto("/");
    await expect(
      page
        .locator("#services")
        .getByRole("link", { name: /criminal law.*bail.*criminal trials/i })
    ).toBeVisible();
    await page
      .locator("#services")
      .getByRole("link", { name: /criminal law.*bail.*criminal trials/i })
      .click();
    await expect(page).toHaveURL(/\/services\/criminal-law$/);
    await expect(
      page.getByRole("heading", { level: 1, name: /criminal law/i })
    ).toBeVisible();

    await page.goto("/");
    await page
      .locator("#blog")
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

  test("toggles FAQ answers using the current accordion behavior", async ({
    page,
  }) => {
    await gotoHomepage(page);
    const faqSection = page.locator("#faq");

    await expect(page.locator("#testimonial")).toHaveCount(0);

    const forumButton = faqSection.getByRole("button", {
      name: /what forums do you represent clients before\?/i,
    });
    const approachButton = faqSection.getByRole("button", {
      name: /what is your legal approach\?/i,
    });

    await expect(forumButton).toHaveAttribute("aria-expanded", "false");
    await forumButton.click();
    await expect(forumButton).toHaveAttribute("aria-expanded", "true");
    await expect(
      faqSection.getByText(/madras high court, district courts/i)
    ).toBeVisible();

    await approachButton.click();
    await expect(forumButton).toHaveAttribute("aria-expanded", "false");
    await expect(approachButton).toHaveAttribute("aria-expanded", "true");
    await expect(
      faqSection.getByText(/detailed case analysis/i)
    ).toBeVisible();

    await approachButton.click();
    await expect(approachButton).toHaveAttribute("aria-expanded", "false");
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
    await expect(toggleButton).toBeHidden();

    const servicesLink = page.getByRole("link", { name: /services 02/i });
    await expect(servicesLink).toBeVisible();
    await expect(page.getByRole("link", { name: /team 03/i })).toBeVisible();

    await servicesLink.click();
    await expect(page).toHaveURL(/#services$/);
    await expect(toggleButton).toBeVisible();
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
    expect(openCalls[0][0]).toContain("https://wa.me/918939588855?text=");
    expect(openCalls[0][0]).toContain(
      encodeURIComponent("I need support in a property dispute.")
    );

    await expect(page.getByRole("button", { name: "Open chat" })).toBeVisible();
    await expect(page.getByText("Chat with AGD")).toBeVisible();
  });
});
