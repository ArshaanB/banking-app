import { Request, Response } from 'express';
import {
  CustomerService,
  AccountService,
  TransactionService
} from '../services';
import {
  CreateCustomerRequest,
  GetCustomerByIdRequest,
  CreateAccountRequest,
  TransferRequest,
  GetAccountByIdRequest,
  GetTransactionsByAccountIdRequest
} from '../models';

export class CustomerController {
  // POST /api/customers
  static async createCustomer(
    req: Request<{}, any, CreateCustomerRequest>,
    res: Response
  ) {
    const requestBody: CreateCustomerRequest = req.body;
    if (!requestBody.name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    try {
      const customer = await CustomerService.createCustomer(requestBody);
      return res.status(201).json(customer);
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }

      return res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }

  // GET /api/customers/:customerId
  static async getCustomerById(
    req: Request<GetCustomerByIdRequest>,
    res: Response
  ) {
    const requestParams: GetCustomerByIdRequest = req.params;
    if (!requestParams.customerId) {
      return res.status(400).json({ error: 'Customer ID is required' });
    }

    try {
      const customer = await CustomerService.getCustomerById(requestParams);
      return res.status(200).json(customer);
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }

      return res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
}

export class AccountController {
  // POST /api/accounts
  static async createAccount(
    req: Request<{}, any, CreateAccountRequest>,
    res: Response
  ) {
    const requestBody: CreateAccountRequest = req.body;
    if (!requestBody.customerId) {
      return res.status(400).json({ error: 'Customer ID is required' });
    }

    if (!requestBody.balance) {
      return res.status(400).json({ error: 'Balance is required' });
    }

    try {
      const account = await AccountService.createAccount(requestBody);
      return res.status(201).json(account);
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }

      return res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }

  // GET /api/accounts/:accountId
  static async getAccountById(
    req: Request<GetAccountByIdRequest>,
    res: Response
  ) {
    const requestParams: GetAccountByIdRequest = req.params;
    if (!requestParams.accountId) {
      return res.status(400).json({ error: 'Account ID is required' });
    }

    try {
      const account = await AccountService.getAccountById(requestParams);
      return res.status(200).json(account);
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }

      return res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }

  // POST /api/accounts/transfer
  static async transfer(req: Request<{}, any, TransferRequest>, res: Response) {
    const requestBody: TransferRequest = req.body;
    if (!requestBody.fromAccountId) {
      return res.status(400).json({ error: 'From account ID is required' });
    }

    if (!requestBody.toAccountId) {
      return res.status(400).json({ error: 'To account ID is required' });
    }

    if (!requestBody.amount || requestBody.amount <= 0) {
      return res
        .status(400)
        .json({ error: 'A valid amount to transfer is required' });
    }

    try {
      const transaction = await AccountService.transfer(requestBody);
      return res.status(201).json(transaction);
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }

      return res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
}

export class TransactionController {
  // GET /api/transactions/account/:accountId
  static async getTransactionsByAccountId(
    req: Request<GetTransactionsByAccountIdRequest>,
    res: Response
  ) {
    const requestParams: GetTransactionsByAccountIdRequest = req.params;
    if (!requestParams.accountId) {
      return res.status(400).json({ error: 'Account ID is required' });
    }

    try {
      const transactions = await TransactionService.getTransactionsByAccountId(
        requestParams
      );
      return res.status(200).json(transactions);
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }

      return res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
}
