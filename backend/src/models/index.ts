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
  type: string;
}

// Requests
interface CreateCustomerRequest {
  name: string;
}

interface GetCustomerByIdRequest {
  customerId: string;
}

interface CreateAccountRequest {
  customerId: string;
  balance: number;
}

interface GetAccountByIdRequest {
  accountId: string;
}

interface TransferRequest {
  fromAccountId: string;
  toAccountId: string;
  amount: number;
}

interface GetTransactionsByAccountIdRequest {
  accountId: string;
}

export {
  Customer,
  Account,
  Transaction,
  CreateCustomerRequest,
  GetCustomerByIdRequest,
  CreateAccountRequest,
  GetAccountByIdRequest,
  TransferRequest,
  GetTransactionsByAccountIdRequest
};
