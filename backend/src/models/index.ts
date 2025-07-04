// Entities
interface Customer {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Account {
  id: string;
  customerId: string;
  balance: number;
  createdAt: Date;
  updatedAt: Date;
}

interface Transaction {
  id: string;
  amount: number;
  fromAccountId: string;
  toAccountId: string;
  createdAt: Date;
  updatedAt: Date;
}

// Requests
interface CreateCustomerRequest {
  name: string;
}

interface CreateAccountRequest {
  customerId: string;
  balance: number;
}

interface TransferRequest {
  fromAccountId: string;
  toAccountId: string;
  amount: number;
}

export {
  Customer,
  Account,
  Transaction,
  CreateCustomerRequest,
  CreateAccountRequest,
  TransferRequest
};
