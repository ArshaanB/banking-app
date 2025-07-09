import { Router } from 'express';
import {
  CustomerController,
  AccountController,
  TransactionController
} from '../controllers';

const router = Router();

router.post('/customers', CustomerController.createCustomer);
router.get('/customers/:customerId', CustomerController.getCustomerById);

router.post('/accounts', AccountController.createAccount);
router.get('/accounts/:accountId', AccountController.getAccountById);
router.post('/accounts/transfer', AccountController.transfer);

router.get(
  '/transactions/account/:accountId',
  TransactionController.getTransactionsByAccountId
);

export default router;
