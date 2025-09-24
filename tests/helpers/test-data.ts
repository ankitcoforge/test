/**
 * Test data and utilities for ADL Portal automation tests
 */

export const TestData = {
  // User credentials (use environment variables in real implementation)
  users: {
    dealer: {
      username: process.env.DEALER_USERNAME || 'test_dealer',
      password: process.env.DEALER_PASSWORD || 'test_password'
    },
    admin: {
      username: process.env.ADMIN_USERNAME || 'test_admin',
      password: process.env.ADMIN_PASSWORD || 'test_password'
    }
  },

  // ACH Account test data
  achAccounts: {
    checking: {
      nickname: 'Main Business Checking',
      accountType: 'Checking',
      accountNumber: '1234567890',
      routingNumber: '021000021' // Valid Wells Fargo routing
    },
    savings: {
      nickname: 'Personal Savings',
      accountType: 'Savings',
      accountNumber: '9876543210',
      routingNumber: '111000025' // Valid routing number
    }
  },

  // Invalid test data for negative testing
  invalidData: {
    routingNumbers: {
      tooShort: '12345678',
      tooLong: '1234567890',
      withLetters: 'ABCD12345',
      withHyphens: '123-456-789',
      allZeros: '000000000'
    },
    accountNumbers: {
      tooShort: '123',
      tooLong: '123456789012345678901',
      withLetters: 'ABC1234567',
      withSpecialChars: '123-456-7890'
    }
  },

  // URLs and navigation paths
  urls: {
    base: 'https://qainternal.adl.aulcorp.com',
    login: '/login',
    remitContracts: '/remit-contracts',
    paymentMethods: '/payment-methods'
  }
};

export const TestHelpers = {
  /**
   * Generate random test data
   */
  generateRandomAccountNumber: (length: number = 10): string => {
    return Math.random().toString().slice(2, 2 + length);
  },

  generateRandomNickname: (): string => {
    const adjectives = ['Business', 'Personal', 'Main', 'Primary', 'Secondary'];
    const types = ['Checking', 'Savings', 'Operating', 'Reserve'];
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const type = types[Math.floor(Math.random() * types.length)];
    return `${adj} ${type} ${Date.now()}`;
  },

  /**
   * Wait for network idle (useful for SPA applications)
   */
  waitForNetworkIdle: async (page: any, timeout: number = 30000) => {
    await page.waitForLoadState('networkidle', { timeout });
  },

  /**
   * Take screenshot with timestamp
   */
  takeTimestampedScreenshot: async (page: any, name: string) => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    await page.screenshot({ 
      path: `screenshots/${name}-${timestamp}.png`,
      fullPage: true 
    });
  }
};
