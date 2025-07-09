import { randomUUID } from 'crypto';
import { store } from '../store';
import {
  Customer,
  Account,
  Transaction,
  CreateCustomerRequest,
  CreateAccountRequest,
  TransferRequest
} from '../models';

export class CustomerService {
  static async createCustomer(
    request: CreateCustomerRequest
  ): Promise<Customer> {
    const newCustomer = {
      ...request,
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    try {
      const customer = await store.createCustomer(newCustomer);
      if (!customer) {
        throw new Error('Failed to create customer');
      }
      return customer;
    } catch (error) {
      throw error;
    }
  }

  static async getCustomerById(customerId: string): Promise<Customer> {
    try {
      const customer = await store.getCustomerById(customerId);
      if (!customer) {
        throw new Error('Customer not found');
      }
      return customer;
    } catch (error) {
      throw error;
    }
  }
}

export class AccountService {
  static async createAccount(request: CreateAccountRequest): Promise<Account> {
    const customer = store.getCustomerById(request.customerId);
    if (!customer) {
      throw new Error('Customer not found');
    }
    if (request.balance <= 0) {
      throw new Error('Balance must be greater than 0');
    }

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

  static async transfer(request: TransferRequest): Promise<Transaction> {
    const fromAccount = await store.getAccountById(request.fromAccountId);
    if (!fromAccount) {
      throw new Error('From account not found');
    }

    const toAccount = await store.getAccountById(request.toAccountId);
    if (!toAccount) {
      throw new Error('To account not found');
    }

    if (fromAccount.id === toAccount.id) {
      throw new Error('Cannot transfer to the same account');
    }

    if (fromAccount.balance < request.amount) {
      throw new Error('Insufficient funds');
    }

    const transaction = {
      id: randomUUID(),
      fromAccountId: fromAccount.id,
      toAccountId: toAccount.id,
      amount: request.amount,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    try {
      const updatedFromAccount = {
        id: fromAccount.id,
        balance: fromAccount.balance - request.amount
      };
      const updatedToAccount = {
        id: toAccount.id,
        balance: toAccount.balance + request.amount
      };
      await store.updateAccountBalance(
        updatedFromAccount.id,
        updatedFromAccount.balance
      );
      await store.updateAccountBalance(
        updatedToAccount.id,
        updatedToAccount.balance
      );
      return store.createTransaction(transaction);
    } catch (error) {
      throw new Error('Failed to create transaction');
    }
  }
}
