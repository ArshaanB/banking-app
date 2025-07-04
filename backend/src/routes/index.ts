import { Router } from 'express';
import { CustomerController, AccountController } from '../controllers';

const router = Router();

router.post('/customers', CustomerController.createCustomer);

router.post('/accounts', AccountController.createAccount);

router.post('/transfers', AccountController.transfer);

export default router;
