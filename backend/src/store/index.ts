import { Customer, Account, Transaction } from '../models';

class InMemoryStore {
  private customers: Map<string, Customer> = new Map<string, Customer>();
  private accounts: Map<string, Account> = new Map<string, Account>();
  private transactions: Transaction[] = [];

  async createCustomer(customer: Customer): Promise<Customer> {
    this.customers.set(customer.id, customer);
    return customer;
  }

  async getCustomerById(id: string): Promise<Customer | undefined> {
    return this.customers.get(id);
  }

  async createAccount(account: Account): Promise<Account> {
    this.accounts.set(account.id, account);
    return account;
  }

  async getAccountById(id: string): Promise<Account | undefined> {
    return this.accounts.get(id);
  }

  async transfer(fromAccountId: string, toAccountId: string, amount: number) {
    const fromAccount = this.accounts.get(fromAccountId);
    if (!fromAccount) {
      throw new Error('From account not found');
    }
    const toAccount = this.accounts.get(toAccountId);
    if (!toAccount) {
      throw new Error('To account not found');
    }
    fromAccount.balance -= amount;
    toAccount.balance += amount;
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
    this.customers.clear();
    this.accounts.clear();
    this.transactions = [];
  }
}

export const store = new InMemoryStore();
