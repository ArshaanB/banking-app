import { describe, it, expect, beforeEach } from 'vitest';
import { store } from '../store';
import { CustomerService, AccountService } from './index';

describe('Services', () => {
  beforeEach(() => {
    store.clearAll();
  });

  describe('CustomerService', () => {
    it('should create a customer', async () => {
      const customer = await CustomerService.createCustomer({
        name: 'John Doe'
      });
      expect(customer).toBeDefined();
      expect(customer.id).toBeDefined();
      expect(customer.name).toBe('John Doe');
    });
  });

  describe('AccountService', () => {
    it('should create an account', async () => {
      const account = await AccountService.createAccount({
        customerId: '1',
        balance: 100
      });

      expect(account).toBeDefined();
      expect(account.id).toBeDefined();
      expect(account.customerId).toBe('1');
      expect(account.balance).toBe(100);
    });
  });
});
