import { test, expect } from '@playwright/test';

/**
 * Example test suite demonstrating Playwright best practices
 * Following the guidelines from playwright-typescript.instructions.md
 */
test.describe('ADL Portal - Example Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the application before each test
    await page.goto('/');
  });

  test('Login page should load successfully', async ({ page }) => {
    await test.step('Verify login page elements', async () => {
      // Use accessible locators and verify page structure
      await expect(page).toHaveTitle(/ADL/);
      
      // Verify login form is present using accessible locators
      const loginForm = page.getByRole('form');
      await expect(loginForm).toBeVisible();
      
      const usernameField = page.getByRole('textbox', { name: /username|email/i });
      await expect(usernameField).toBeVisible();
      
      const passwordField = page.getByRole('textbox', { name: /password/i });
      await expect(passwordField).toBeVisible();
      
      const loginButton = page.getByRole('button', { name: /login|sign in/i });
      await expect(loginButton).toBeVisible();
    });
  });

  test('Navigation menu should be accessible', async ({ page }) => {
    await test.step('Check main navigation structure', async () => {
      // Use toMatchAriaSnapshot for comprehensive accessibility verification
      const navigation = page.getByRole('navigation');
      await expect(navigation).toBeVisible();
      
      // Verify navigation items are present
      const menuItems = page.getByRole('menuitem');
      await expect(menuItems).toHaveCount({ min: 1 });
    });
  });

  test('Search functionality should work correctly', async ({ page }) => {
    await test.step('Perform search operation', async () => {
      const searchInput = page.getByRole('searchbox');
      if (await searchInput.isVisible()) {
        await searchInput.fill('test query');
        await searchInput.press('Enter');
        
        // Wait for search results and verify
        await expect(page.getByText('search results', { exact: false })).toBeVisible();
      }
    });
  });
});
