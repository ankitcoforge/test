# Playwright Automation Project

A comprehensive end-to-end testing framework for ADL Portal using Playwright and TypeScript.

## 🚀 Project Overview

This project contains automated tests for the ADL Portal, specifically focusing on:
- **PBI 40260**: ACH Account Information Pop-up functionality
- Navigation and user interface testing
- Form validation and error handling
- Cross-browser compatibility testing
- Accessibility compliance verification

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

## 🛠 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ankitcoforge/test.git
   cd test
   git checkout ankit
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install Playwright browsers:**
   ```bash
   npm run install:browsers
   ```

4. **Install system dependencies (Linux only):**
   ```bash
   npm run install:deps
   ```

## 🏃 Running Tests

### Basic Test Execution
```bash
# Run all tests
npm test

# Run tests in headed mode (visible browser)
npm run test:headed

# Run tests with UI mode (interactive)
npm run test:ui

# Debug tests
npm run test:debug
```

### Browser-Specific Testing
```bash
# Run tests in Chromium only
npm run test:chromium

# Run tests in Firefox only
npm run test:firefox

# Run tests in WebKit only
npm run test:webkit
```

### View Test Reports
```bash
# Open HTML report
npm run report
```

## 📁 Project Structure

```
.
├── tests/                          # Test files
│   ├── example.spec.ts             # Example test demonstrating best practices
│   ├── ach-account-management.spec.ts  # PBI 40260 ACH tests
│   ├── helpers/                    # Test utilities and helpers
│   │   └── test-data.ts           # Test data and helper functions
│   └── fixtures/                   # Playwright fixtures
│       └── auth.fixture.ts        # Authentication fixtures
├── playwright.config.ts            # Playwright configuration
├── tsconfig.json                  # TypeScript configuration
├── package.json                   # Project dependencies and scripts
├── .gitignore                     # Git ignore rules
└── README.md                      # This file
```

## 🎯 Test Coverage

### PBI 40260 - ACH Account Information Pop-up
- ✅ Navigation to Manage Payment Method Page
- ✅ ACH Account Information Pop-up access
- ✅ Form field validation and layout
- ✅ Account creation (Checking and Savings types)
- ✅ Account editing functionality
- ✅ Error handling and validation
- ✅ Security (account number masking)
- ✅ Database integration testing

### Test Categories
- **Navigation Tests**: User journey and page navigation
- **Functional Tests**: Core feature functionality
- **Validation Tests**: Input validation and error handling
- **Edge Cases**: Boundary conditions and negative scenarios
- **Integration Tests**: Database and system integration
- **Accessibility Tests**: WCAG compliance and keyboard navigation

## ⚙️ Configuration

### Environment Variables
Create a `.env` file for sensitive data:
```bash
DEALER_USERNAME=your_dealer_username
DEALER_PASSWORD=your_dealer_password
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_admin_password
BASE_URL=https://qainternal.adl.aulcorp.com
```

### Playwright Configuration
The `playwright.config.ts` file includes:
- Multi-browser testing (Chromium, Firefox, WebKit)
- Mobile device simulation
- Automatic retry on failure
- Screenshot and video recording on failure
- Trace collection for debugging
- HTML, JSON, and JUnit reporting

## 📝 Writing Tests

### Best Practices
1. **Use Accessible Locators**: Prefer `getByRole`, `getByLabel`, `getByText`
2. **Structure with test.step()**: Group related interactions
3. **Auto-retrying Assertions**: Use `await expect(locator).toBeVisible()`
4. **Avoid Hard Waits**: Rely on Playwright's auto-waiting
5. **Clear Test Titles**: Describe the intent clearly

### Example Test
```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Should perform specific action', async ({ page }) => {
    await test.step('Step description', async () => {
      const element = page.getByRole('button', { name: 'Button Name' });
      await element.click();
      await expect(page.getByText('Expected Result')).toBeVisible();
    });
  });
});
```

## 🐛 Debugging

### Debug Mode
```bash
# Run in debug mode with Playwright Inspector
npm run test:debug
```

### Screenshots and Videos
- Screenshots are taken automatically on test failures
- Videos are recorded for failed tests
- Traces are collected on first retry

### View Traces
```bash
# Open trace viewer
npx playwright show-trace trace.zip
```

## 🔧 CI/CD Integration

The project is configured for CI/CD with:
- Automatic retry on CI (2 retries)
- Single worker on CI for stability
- Multiple report formats (HTML, JSON, JUnit)
- Test results stored in `test-results/` directory

### GitHub Actions Example
```yaml
- name: Install dependencies
  run: npm ci
- name: Install Playwright browsers
  run: npx playwright install --with-deps
- name: Run Playwright tests
  run: npm test
```

## 📊 Reports

Test reports are generated in multiple formats:
- **HTML Report**: Interactive report with screenshots and videos
- **JSON Report**: Machine-readable results in `test-results/results.json`
- **JUnit Report**: XML format for CI integration in `test-results/results.xml`

## 🤝 Contributing

1. Create a feature branch from `ankit`
2. Write tests following the established patterns
3. Ensure all tests pass
4. Submit a pull request

## 📚 Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [ADL Portal Test Cases](./PBI_40260_Test_Cases_Generated.md)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 🆘 Troubleshooting

### Common Issues

1. **Browser Installation Issues**:
   ```bash
   npx playwright install --force
   ```

2. **Permission Issues on Linux**:
   ```bash
   sudo npx playwright install-deps
   ```

3. **Test Timeouts**:
   - Check network connectivity
   - Increase timeout in `playwright.config.ts`
   - Use `page.waitForLoadState('networkidle')`

4. **Flaky Tests**:
   - Use proper wait conditions
   - Check for race conditions
   - Enable retry mechanism

## 📞 Support

For questions or issues:
1. Check the [Playwright Documentation](https://playwright.dev/docs/intro)
2. Review existing test cases for patterns
3. Create an issue in the repository

---

**Happy Testing! 🎭**
