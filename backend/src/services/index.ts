import { randomUUID } from 'crypto';
import { store } from '../store';
import {
  Customer,
  Account,
  CreateCustomerRequest,
  CreateAccountRequest
} from '../models';

export class CustomerService {
  static createCustomer(request: CreateCustomerRequest): Promise<Customer> {
    const newCustomer = {
      ...request,
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    try {
      return store.createCustomer(newCustomer);
    } catch (error) {
      throw new Error('Failed to create customer');
    }
  }
}

export class AccountService {
  static createAccount(request: CreateAccountRequest): Promise<Account> {
    const newAccount = {
      ...request,
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    try {
      return store.createAccount(newAccount);
    } catch (error) {
      throw new Error('Failed to create account');
    }
  }
}
