import { describe, it, expect, beforeEach } from 'vitest';
import { CustomerController, AccountController } from './index';
import { store } from '../store';
import request from 'supertest';
import app from '../index';

describe('Controllers or API', () => {
  beforeEach(() => {
    store.clearAll();
  });

  describe('CustomerController', () => {
    it('should create a customer', async () => {
      const customerData = {
        name: 'John Doe'
      };

      const response = await request(app)
        .post('/api/customers')
        .send(customerData);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe(customerData.name);
    });
  });

  describe('AccountController', () => {
    it('should create an account', async () => {
      const accountData = {
        customerId: '1',
        balance: 100
      };

      const response = await request(app)
        .post('/api/accounts')
        .send(accountData);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.customerId).toBe(accountData.customerId);
    });
  });
});
