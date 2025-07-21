export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';

// Entity Types
export interface Customer {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Account {
  id: string;
  customerId: string;
  balance: number;
  createdAt: string;
  updatedAt: string;
}

export type Entity = Customer | Account;

// API Request Types
export interface CreateCustomerRequest {
  name: string;
}

export interface CreateAccountRequest {
  customerId: string;
  balance: number;
}

// API Response Types
export interface AccountBalanceResponse {
  accountId: string;
  balance: number;
}
export interface TransferMoneyRequest {
  fromAccountId: string;
  toAccountId: string;
  amount: number;
}

interface Transaction {
  id: string;
  amount: number;
  fromAccountId: string;
  toAccountId: string;
  createdAt: Date;
  updatedAt: Date;
  type: string;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error: ${response.status} - ${errorText}`);
    }

    return response.json();
  }

  async createCustomer(data: CreateCustomerRequest): Promise<Customer> {
    return this.request<Customer>('/api/customers', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async getCustomerById(customerId: string): Promise<Customer> {
    return this.request<Customer>(`/api/customers/${customerId}`);
  }

  async createAccount(data: CreateAccountRequest): Promise<Account> {
    return this.request<Account>('/api/accounts', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async getAccountById(accountId: string): Promise<Account> {
    return this.request<Account>(`/api/accounts/${accountId}`);
  }

  async transferMoney(data: TransferMoneyRequest): Promise<Transaction> {
    return this.request<Transaction>('/api/accounts/transfer', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async getAccountBalance(accountId: string): Promise<AccountBalanceResponse> {
    return this.request<AccountBalanceResponse>(
      `/api/accounts/${accountId}/balance`
    );
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
