import { test, expect } from '@playwright/test';

/**
 * Test suite for PBI 40260 - ACH Account Information Pop-up
 * Based on the test cases defined in PBI_40260_Test_Cases_Generated.md
 */
test.describe('PBI 40260 - ACH Account Information Pop-up', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to ADL Portal and login
    await page.goto('/');
    // Add login steps here when credentials are available
  });

  test('Navigate to Manage Payment Method Page via Remit Contracts', async ({ page }) => {
    await test.step('Navigate to Remit Contracts to Protective', async () => {
      // Locate and click Remit Contracts to Protective menu
      const remitLink = page.getByRole('link', { name: /remit contracts to protective/i });
      await remitLink.click();
      
      // Verify page loads with Manage Payment Methods button
      await expect(page.getByRole('button', { name: /manage payment methods/i })).toBeVisible();
    });

    await test.step('Access Manage Payment Methods functionality', async () => {
      const managePaymentBtn = page.getByRole('button', { name: /manage payment methods/i });
      await managePaymentBtn.click();
      
      // Verify redirect to Manage Payment Method page
      await expect(page.getByRole('combobox', { name: /payment method/i })).toBeVisible();
    });

    await test.step('Verify ACH payment method availability', async () => {
      const paymentMethodDropdown = page.getByRole('combobox', { name: /payment method/i });
      await paymentMethodDropdown.click();
      
      // Verify ACH option is available
      const achOption = page.getByRole('option', { name: /ach/i });
      await expect(achOption).toBeVisible();
    });
  });

  test('Access ACH Account Information Pop-up', async ({ page }) => {
    // This test assumes we're already on the Manage Payment Method page
    await test.step('Set Payment Method to ACH', async () => {
      const paymentMethodDropdown = page.getByRole('combobox', { name: /payment method/i });
      await paymentMethodDropdown.selectOption('ACH');
      
      // Verify ACH controls become visible
      await expect(page.getByRole('button', { name: /add ach account/i })).toBeVisible();
    });

    await test.step('Open ACH Account Information Pop-up', async () => {
      const addAchBtn = page.getByRole('button', { name: /add ach account/i });
      await addAchBtn.click();
      
      // Verify modal pop-up opens
      const modal = page.getByRole('dialog', { name: /ach account information/i });
      await expect(modal).toBeVisible();
      
      // Verify required form fields are present
      await expect(page.getByRole('textbox', { name: /account nickname/i })).toBeVisible();
      await expect(page.getByRole('combobox', { name: /account type/i })).toBeVisible();
      await expect(page.getByRole('textbox', { name: /account number/i })).toBeVisible();
      await expect(page.getByRole('textbox', { name: /confirm account number/i })).toBeVisible();
      await expect(page.getByRole('textbox', { name: /routing number/i })).toBeVisible();
      await expect(page.getByRole('checkbox', { name: /default account/i })).toBeVisible();
    });
  });

  test('Create New ACH Account - Checking Type (Happy Path)', async ({ page }) => {
    // Assume ACH Account Information Pop-up is open
    const testData = {
      nickname: 'Main Business Checking',
      accountType: 'Checking',
      accountNumber: '1234567890',
      routingNumber: '021000021'
    };

    await test.step('Fill ACH account form with valid data', async () => {
      await page.getByRole('textbox', { name: /account nickname/i }).fill(testData.nickname);
      await page.getByRole('combobox', { name: /account type/i }).selectOption(testData.accountType);
      await page.getByRole('textbox', { name: /account number/i }).fill(testData.accountNumber);
      await page.getByRole('textbox', { name: /confirm account number/i }).fill(testData.accountNumber);
      await page.getByRole('textbox', { name: /routing number/i }).fill(testData.routingNumber);
      await page.getByRole('checkbox', { name: /default account/i }).check();
    });

    await test.step('Save ACH account and verify success', async () => {
      const saveBtn = page.getByRole('button', { name: /save/i });
      await expect(saveBtn).toBeEnabled();
      await saveBtn.click();
      
      // Verify success message or pop-up closes
      const modal = page.getByRole('dialog', { name: /ach account information/i });
      await expect(modal).not.toBeVisible();
      
      // Verify account appears in table with masked account number
      const accountRow = page.getByText(testData.nickname);
      await expect(accountRow).toBeVisible();
    });
  });

  test('Account Number Mismatch Validation', async ({ page }) => {
    await test.step('Enter mismatched account numbers', async () => {
      await page.getByRole('textbox', { name: /account nickname/i }).fill('Test Account');
      await page.getByRole('combobox', { name: /account type/i }).selectOption('Checking');
      await page.getByRole('textbox', { name: /account number/i }).fill('1234567890');
      await page.getByRole('textbox', { name: /confirm account number/i }).fill('1234567891');
      await page.getByRole('textbox', { name: /routing number/i }).fill('021000021');
    });

    await test.step('Verify validation error appears', async () => {
      const saveBtn = page.getByRole('button', { name: /save/i });
      await saveBtn.click();
      
      // Verify error message for account number mismatch
      const errorMessage = page.getByText(/account numbers.*match/i);
      await expect(errorMessage).toBeVisible();
      
      // Verify save is prevented
      await expect(saveBtn).toBeDisabled();
    });
  });

  test('Routing Number Format Validation', async ({ page }) => {
    const invalidRoutingNumbers = [
      '12345678',    // 8 digits
      '1234567890',  // 10 digits
      'ABCD12345',   // letters
      '123-456-789', // hyphens
      '000000000'    // all zeros
    ];

    for (const invalidRouting of invalidRoutingNumbers) {
      await test.step(`Test invalid routing number: ${invalidRouting}`, async () => {
        // Fill valid data for other fields
        await page.getByRole('textbox', { name: /account nickname/i }).fill('Test Account');
        await page.getByRole('combobox', { name: /account type/i }).selectOption('Checking');
        await page.getByRole('textbox', { name: /account number/i }).fill('1234567890');
        await page.getByRole('textbox', { name: /confirm account number/i }).fill('1234567890');
        
        // Enter invalid routing number
        const routingField = page.getByRole('textbox', { name: /routing number/i });
        await routingField.clear();
        await routingField.fill(invalidRouting);
        
        // Verify validation error
        await expect(page.getByText(/routing number.*9 digits/i)).toBeVisible();
      });
    }
  });
});
