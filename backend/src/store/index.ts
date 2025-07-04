import { Customer, Account, Transaction } from '../models';

class InMemoryStore {
  private customers: Customer[] = [];
  private accounts: Account[] = [];
  private transactions: Transaction[] = [];

  constructor() {
    this.customers = [];
    this.accounts = [];
    this.transactions = [];
  }

  async createCustomer(customer: Customer): Promise<Customer> {
    this.customers.push(customer);
    return customer;
  }

  async getCustomerById(id: string): Promise<Customer | undefined> {
    return this.customers.find((customer) => customer.id === id);
  }

  async createAccount(account: Account): Promise<Account> {
    this.accounts.push(account);
    return account;
  }

  async getAccountById(id: string): Promise<Account | undefined> {
    return this.accounts.find((account) => account.id === id);
  }

  async clearAll() {
    this.customers = [];
    this.accounts = [];
    this.transactions = [];
  }
}

export const store = new InMemoryStore();
