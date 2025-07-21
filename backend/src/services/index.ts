import { randomUUID } from 'crypto';
import { store } from '../store';
import {
  Customer,
  Account,
  Transaction,
  CreateCustomerRequest,
  CreateAccountRequest,
  TransferRequest,
  GetCustomerByIdRequest,
  GetAccountByIdRequest,
  GetTransactionsByAccountIdRequest
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

  static async getCustomerById(
    request: GetCustomerByIdRequest
  ): Promise<Customer> {
    try {
      const customer = await store.getCustomerById(request.customerId);
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
    try {
      const customer = store.getCustomerById(request.customerId);
      if (!customer) {
        throw new Error('Customer not found');
      }
      if (request.balance <= 0) {
        throw new Error('Initial balance must be greater than 0');
      }

      const newAccount = {
        ...request,
        id: randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      const account = await store.createAccount(newAccount);
      if (!account) {
        throw new Error('Failed to create account');
      }
      return account;
    } catch (error) {
      throw error;
    }
  }

  static async getAccountById(
    request: GetAccountByIdRequest
  ): Promise<Account> {
    try {
      const account = await store.getAccountById(request.accountId);
      if (!account) {
        throw new Error('Account not found');
      }
      return account;
    } catch (error) {
      throw error;
    }
  }

  static async transfer(request: TransferRequest): Promise<Transaction> {
    try {
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
        throw new Error('Insufficient funds to transfer');
      }

      const transaction = {
        ...request,
        id: randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date(),
        type: 'transfer'
      };

      await store.transfer(fromAccount, toAccount, request.amount);
      const createdTransaction = await store.createTransaction(transaction);
      if (!createdTransaction) {
        throw new Error('Failed to create transaction');
      }
      return createdTransaction;
    } catch (error) {
      throw error;
    }
  }
}

export class TransactionService {
  static async getTransactionsByAccountId(
    request: GetTransactionsByAccountIdRequest,
    page: number,
    limit: number
  ): Promise<{ transactions: Transaction[]; hasMore: boolean }> {
    try {
      const { transactions, hasMore } = await store.getTransactionsByAccountId(
        request.accountId,
        page,
        limit
      );
      return { transactions, hasMore };
    } catch (error) {
      throw error;
    }
  }
}
