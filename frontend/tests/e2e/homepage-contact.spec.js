const { test, expect } = require("@playwright/test");

async function gotoHomepage(page) {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1, name: /agd law/i })).toBeVisible();
}

async function fillContactForm(page) {
  const contactSection = page.locator("#contact");

  await contactSection
    .getByRole("button", { name: "Civil Litigation" })
    .click();
  await contactSection
    .getByRole("button", { name: "Within This Week" })
    .click();
  await contactSection.getByLabel("Your Name").fill("Jane Client");
  await contactSection
    .getByLabel("Email Address")
    .fill("jane.client@example.com");
  await contactSection
    .getByLabel("Phone Number")
    .fill("+91 98765 43210");
  await contactSection
    .getByLabel("Your Message")
    .fill("I need help reviewing a property dispute.");

  return contactSection;
}

test.describe("homepage contact form", () => {
  test("renders core homepage content and the contact form", async ({
    page,
  }) => {
    await gotoHomepage(page);

    await expect(
      page.getByRole("heading", { level: 2, name: /need legal support\?/i })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 3, name: "Send a Message" })
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Send Message" })
    ).toBeVisible();
  });

  test("blocks submission until service and timeline are selected", async ({
    page,
  }) => {
    let requestCount = 0;

    await page.route("**/api/contact", async (route) => {
      requestCount += 1;
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true }),
      });
    });

    await gotoHomepage(page);

    const contactSection = page.locator("#contact");

    await contactSection.getByLabel("Your Name").fill("Jane Client");
    await contactSection
      .getByLabel("Email Address")
      .fill("jane.client@example.com");
    await contactSection
      .getByLabel("Your Message")
      .fill("Please call me back tomorrow.");
    await contactSection.getByRole("button", { name: "Send Message" }).click();

    await expect(
      contactSection.getByText(
        "Please select a service and preferred timeline."
      )
    ).toBeVisible();
    expect(requestCount).toBe(0);
  });

  test("submits successfully, sends the expected payload, and resets the form", async ({
    page,
  }) => {
    let payload;

    await page.route("**/api/contact", async (route) => {
      payload = JSON.parse(route.request().postData() || "{}");
      await new Promise((resolve) => setTimeout(resolve, 150));
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true }),
      });
    });

    await gotoHomepage(page);

    const contactSection = await fillContactForm(page);
    await contactSection.getByRole("button", { name: "Send Message" }).click();

    await expect(
      contactSection.getByRole("button", { name: "Sending..." })
    ).toBeDisabled();
    await expect(
      contactSection.getByText(
        "Thanks! Your message was sent. We'll be in touch shortly."
      )
    ).toBeVisible();

    expect(payload).toEqual({
      your_name: "Jane Client",
      your_email: "jane.client@example.com",
      your_phone: "+91 98765 43210",
      service_type: "civil_litigation",
      budget: "within_week",
      message: "I need help reviewing a property dispute.",
    });

    await expect(contactSection.getByLabel("Your Name")).toHaveValue("");
    await expect(contactSection.getByLabel("Email Address")).toHaveValue("");
    await expect(contactSection.getByLabel("Phone Number")).toHaveValue("");
    await expect(contactSection.getByLabel("Your Message")).toHaveValue("");
    await expect(
      contactSection.getByRole("button", { name: "Civil Litigation" })
    ).toHaveAttribute("aria-pressed", "false");
    await expect(
      contactSection.getByRole("button", { name: "Within This Week" })
    ).toHaveAttribute("aria-pressed", "false");
  });

  test("surfaces API errors without clearing the form", async ({ page }) => {
    await page.route("**/api/contact", async (route) => {
      await route.fulfill({
        status: 502,
        contentType: "application/json",
        body: JSON.stringify({ error: "Resend request failed." }),
      });
    });

    await gotoHomepage(page);

    const contactSection = await fillContactForm(page);
    await contactSection.getByRole("button", { name: "Send Message" }).click();

    await expect(
      contactSection.getByText("Resend request failed.")
    ).toBeVisible();
    await expect(contactSection.getByLabel("Your Name")).toHaveValue(
      "Jane Client"
    );
    await expect(contactSection.getByLabel("Email Address")).toHaveValue(
      "jane.client@example.com"
    );
    await expect(contactSection.getByLabel("Phone Number")).toHaveValue(
      "+91 98765 43210"
    );
    await expect(contactSection.getByLabel("Your Message")).toHaveValue(
      "I need help reviewing a property dispute."
    );
  });
});
