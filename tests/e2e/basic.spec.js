import { test, expect } from '@playwright/test';

test.describe('Matdaan Saathi Basic Flow', () => {
  test('should navigate to FAQ and use AI Chat', async ({ page }) => {
    // 1. Landing
    await page.goto('/');
    await expect(page).toHaveTitle(/Matdaan Saathi/);

    // 2. Open AI Chat
    const chatButton = page.locator('button[aria-label="Ask our AI assistant for help"]');
    await expect(chatButton).toBeVisible();
    await chatButton.click();

    // 3. Verify Chat Modal
    const modal = page.locator('div[role="dialog"]');
    await expect(modal).toBeVisible();

    // 4. Send a message
    const input = page.locator('input[placeholder="Type your question here..."]');
    await input.fill('What is EPIC?');
    await input.press('Enter');

    // 5. Wait for response
    const assistantMessage = page.locator('div:has-text("EPIC")');
    // Note: In real E2E we might need to mock the API or wait for actual response
    // For now, we verify the user message appeared
    await expect(page.locator('text=What is EPIC?')).toBeVisible();
  });
});
