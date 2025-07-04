import { Request, Response } from 'express';
import { CustomerService, AccountService } from '../services';
import { CreateCustomerRequest, CreateAccountRequest } from '../models';

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
      console.error(error);

      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }

      return res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
}
