export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';

// Entity Types
export interface Customer {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

// API Request Types
export interface CreateCustomerRequest {
  name: string;
}

// API Response Types
export interface AccountBalanceResponse {
  accountId: string;
  balance: number;
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

  async getAccountBalance(accountId: string): Promise<AccountBalanceResponse> {
    return this.request<AccountBalanceResponse>(
      `/api/accounts/${accountId}/balance`
    );
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
