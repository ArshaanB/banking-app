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

  async updateAccountBalance(id: string, balance: number): Promise<Account> {
    const account = this.accounts.find((a) => a.id === id)!;
    account.balance = balance;
    return account;
  }

  async createTransaction(transaction: Transaction): Promise<Transaction> {
    this.transactions.push(transaction);
    return transaction;
  }

  async getTransactionById(id: string): Promise<Transaction | undefined> {
    return this.transactions.find((transaction) => transaction.id === id);
  }

  async getTransactionsByAccountId(accountId: string): Promise<Transaction[]> {
    return this.transactions.filter(
      (transaction) =>
        transaction.fromAccountId === accountId ||
        transaction.toAccountId === accountId
    );
  }

  async clearAll() {
    this.customers = [];
    this.accounts = [];
    this.transactions = [];
  }
}

export const store = new InMemoryStore();
