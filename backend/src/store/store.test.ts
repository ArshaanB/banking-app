import { describe, it, expect, beforeEach } from 'vitest';
import { store } from './index';

describe('InMemoryStore', () => {
  beforeEach(() => {
    store.clearAll();
  });

  describe('Customer', () => {
    it('should create a customer', async () => {
      const customer = await store.createCustomer({
        id: '1',
        name: 'John Doe',
        createdAt: new Date(),
        updatedAt: new Date()
      });

      expect(customer).toBeDefined();
      expect(customer.id).toBe('1');

      const retrievedCustomer = await store.getCustomerById('1');
      expect(retrievedCustomer).toBeDefined();
      expect(retrievedCustomer?.name).toBe('John Doe');
    });
  });

  describe('Account', () => {
    it('should create an account', async () => {
      const account = await store.createAccount({
        id: '10',
        customerId: '1',
        balance: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      expect(account).toBeDefined();
      expect(account.id).toBe('10');

      const retrievedAccount = await store.getAccountById('10');
      expect(retrievedAccount).toBeDefined();
      expect(retrievedAccount?.customerId).toBe('1');
      expect(retrievedAccount?.balance).toBe(100);
    });
  });
});
