import { expect, test, type Page } from "@playwright/test";

const demoPassword = "demo123";

async function signIn(
  page: Page,
  account: "Alex - Staff" | "Manager" | "Super Admin" | "IFI Member",
) {
  await page.goto("/login");

  if (account !== "Alex - Staff") {
    await page.getByRole("combobox", { name: "Demo account" }).click();
    await page.getByRole("option", { name: account }).click();
  }

  await page.getByLabel("Password").fill(demoPassword);
  await page.getByRole("button", { name: "Sign in to workspace" }).click();
  await expect(page).not.toHaveURL(/\/login(?:\?|$)/, { timeout: 20_000 });
}

test("complete investor demo connects learning, practice, analytics, and admin", async ({
  page,
}) => {
  await signIn(page, "Alex - Staff");
  await expect(page).toHaveURL(/\/home$/);
  await expect(page.getByText("68%", { exact: true })).toBeVisible();
  await expect(page.getByText("3 / 5", { exact: true })).toBeVisible();
  await expect(page.getByText("84%", { exact: true })).toBeVisible();

  await page.getByRole("link", { name: "My Learning" }).click();
  await page.locator('a[href="/learning/communication-empathy"]').click();
  await page
    .getByLabel(
      "I understand why receiving two answers is confusing. Let me verify the current step with you.",
    )
    .check();
  await page.getByLabel("A summary of the visitor's actual concern").check();
  await page.getByLabel("what the visitor should do next").check();
  await page.getByRole("button", { name: "Complete module" }).click();
  await expect(
    page.getByText("Module complete. Your learning progress has been updated."),
  ).toBeVisible();

  await page.getByRole("link", { name: "Home" }).click();
  await expect(page.getByText("80%", { exact: true })).toBeVisible();
  await expect(page.getByText("4 / 5", { exact: true })).toBeVisible();

  await page.getByRole("link", { name: "Practice Simulator" }).click();
  await page
    .locator('a[href="/practice/course-registration-confusion"]')
    .click();
  await page.getByRole("button", { name: "Begin conversation" }).click();

  const response = page.getByLabel("Your response to the visitor");
  await response.fill(
    "I understand why the different answers are confusing. I will verify the current registration deadline and help you with the next step.",
  );
  await page.getByRole("button", { name: "Send response" }).click();
  await expect(page.getByText("1 employee response")).toBeVisible();

  await response.fill(
    "First, please use the confirmed registration checklist. Then contact the Courses team if any document remains unclear. Thank you.",
  );
  await page.getByRole("button", { name: "Send response" }).click();
  await expect(page.getByText("2 employee responses")).toBeVisible();
  await page.getByRole("button", { name: "End and assess" }).click();

  await expect(page).toHaveURL(/\/assessment\//);
  await expect(
    page.getByRole("heading", { name: "Your learning assessment" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: "Handling Difficult Situations with Grace",
    }),
  ).toBeVisible();
  await expect(
    page.getByText("It is not a formal performance evaluation"),
  ).toBeVisible();

  await page.getByRole("link", { name: "Progress" }).click();
  await expect(page.getByText("8", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Sign out" }).click();
  await expect(page).toHaveURL(/\/login$/);

  await signIn(page, "Manager");
  await expect(page).toHaveURL(/\/manager$/);
  await expect(
    page.getByRole("heading", { name: "Team learning at a glance" }),
  ).toBeVisible();
  await expect(page.getByText("Suggested Training Focus")).toBeVisible();
  await page.getByRole("link", { name: "Team Progress", exact: true }).click();
  await expect(page.getByText("Alex", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Sign out" }).click();
  await expect(page).toHaveURL(/\/login$/);

  await signIn(page, "Super Admin");
  await expect(page).toHaveURL(/\/admin\/scenarios$/);
  await expect(
    page.getByRole("heading", { name: "Practice scenarios" }),
  ).toBeVisible();
  await expect(page.getByText("Course Registration Confusion")).toBeVisible();
  await page
    .getByRole("button", { name: "Deactivate Course Registration Confusion" })
    .click();
  await expect(
    page.getByRole("button", {
      name: "Activate Course Registration Confusion",
    }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Activate Course Registration Confusion" })
    .click();
  await expect(
    page.getByRole("button", {
      name: "Deactivate Course Registration Confusion",
    }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Users" }).click();
  await expect(page.getByText("alex.staff@ifi.demo")).toBeVisible();
});

test("mobile staff navigation remains usable without horizontal overflow", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await signIn(page, "Alex - Staff");
  await expect(
    page.getByRole("heading", { name: "Bonjour, Alex." }),
  ).toBeVisible();

  await page.getByRole("button", { name: "Open navigation" }).click();
  await page.getByRole("link", { name: "Practice Simulator" }).click();
  await expect(
    page.getByRole("heading", { name: "Practice real IFI service situations" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Administration" }),
  ).toBeVisible();

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth,
  );
  expect(hasHorizontalOverflow).toBe(false);
});

test("desktop sidebar stays visible beside long assessment history", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await signIn(page, "Alex - Staff");
  await page.goto("/assessments");
  await expect(
    page.getByRole("heading", { name: "Review your practice feedback" }),
  ).toBeVisible();

  const pageHeight = await page.evaluate(
    () => document.documentElement.scrollHeight,
  );
  expect(pageHeight).toBeGreaterThan(720);

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  const sidebar = await page.locator("aside").boundingBox();
  expect(sidebar).not.toBeNull();
  expect(sidebar!.y).toBe(0);
  expect(sidebar!.height).toBe(720);
  await expect(page.getByRole("link", { name: "My Learning" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign out" })).toBeVisible();

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth,
  );
  expect(hasHorizontalOverflow).toBe(false);
});

test("IFI member learns in a separate self-study workspace", async ({
  page,
}) => {
  await signIn(page, "IFI Member");
  await expect(page).toHaveURL(/\/member$/);
  await expect(
    page.getByRole("heading", { name: "Bonjour, Maya." }),
  ).toBeVisible();
  await expect(page.getByText("1 / 3", { exact: true })).toBeVisible();

  await page.getByRole("link", { name: "Explore Courses" }).click();
  await expect(
    page.getByRole("heading", { name: "Explore French learning" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "French First Steps: Bonjour!" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "French in Everyday Life" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Explore French Culture" }),
  ).toBeVisible();
  await expect(page.getByText("The Savoir-Faire Service Mindset")).toHaveCount(
    0,
  );

  await page
    .locator('a[href="/member/courses/french-in-everyday-life"]')
    .click();
  await page.getByLabel("Où est la bibliothèque, s'il vous plaît ?").check();
  await page.getByLabel("On the left").check();
  await page.getByLabel("À trois heures").check();
  await page.getByRole("button", { name: "Complete module" }).click();
  await expect(
    page.getByText("Module complete. Your learning progress has been updated."),
  ).toBeVisible();

  await page.getByRole("link", { name: "My Progress" }).click();
  await expect(page.getByText("2 / 3", { exact: true })).toBeVisible();
  await page.goto("/learning");
  await expect(page).toHaveURL(/\/member$/);
});
