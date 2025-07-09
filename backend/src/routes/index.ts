import { Router } from 'express';
import { CustomerController, AccountController } from '../controllers';

const router = Router();

router.post('/customers', CustomerController.createCustomer);
router.get('/customers/:customerId', CustomerController.getCustomerById);

router.post('/accounts', AccountController.createAccount);
router.get('/accounts/:accountId', AccountController.getAccountById);

router.post('/transfers', AccountController.transfer);

export default router;
