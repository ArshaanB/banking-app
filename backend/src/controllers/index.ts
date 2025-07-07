import { Request, Response } from 'express';
import { CustomerService, AccountService } from '../services';
import {
  CreateCustomerRequest,
  CreateAccountRequest,
  TransferRequest
} from '../models';

export class CustomerController {
  // POST /api/customers
  static async createCustomer(req: Request, res: Response) {
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
  static async getCustomerById(req: Request, res: Response) {
    const { customerId } = req.params;
    if (!customerId) {
      return res.status(400).json({ error: 'Customer ID is required' });
    }

    try {
      const customer = await CustomerService.getCustomerById(customerId);
      return res.status(200).json(customer);
    } catch (error) {
      return res.status(404).json({ error: 'Customer not found' });
    }
  }
}

export class AccountController {
  // POST /api/accounts
  static async createAccount(req: Request, res: Response) {
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
      return res
        .status(500)
        .json({ error: '[Service] Failed to create account' });
    }
  }

  // POST /api/accounts/transfer
  static async transfer(req: Request, res: Response) {
    const requestBody: TransferRequest = req.body;
    if (!requestBody.fromAccountId) {
      return res.status(400).json({ error: 'From account ID is required' });
    }

    if (!requestBody.toAccountId) {
      return res.status(400).json({ error: 'To account ID is required' });
    }

    if (!requestBody.amount || requestBody.amount <= 0) {
      return res.status(400).json({ error: 'A valid amount is required' });
    }

    try {
      const transaction = await AccountService.transfer(requestBody);
      return res.status(201).json(transaction);
    } catch (error) {
      return res
        .status(500)
        .json({ error: '[Service] Failed to transfer funds' });
    }
  }
}
