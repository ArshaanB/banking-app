import { Customer, Account } from '../models';
import { CustomerService, AccountService } from '../services';

async function seedDatabase() {
  console.log('Seeding database...');

  const customerData = [
    { name: 'John Doe' },
    { name: 'Jane Doe' },
    { name: 'Jim Doe' }
  ];

  const customers: Customer[] = await Promise.all(
    customerData.map((customer) => CustomerService.createCustomer(customer))
  );

  const accountData = [
    {
      customerId: customers[0].id,
      balance: 1000
    },
    {
      customerId: customers[1].id,
      balance: 2000
    },
    {
      customerId: customers[2].id,
      balance: 3000
    }
  ];

  const accounts: Account[] = await Promise.all(
    accountData.map((account) => AccountService.createAccount(account))
  );

  const transferData = Array.from({ length: 30 }, (_, index) => ({
    fromAccountId: accounts[0].id,
    toAccountId: accounts[1].id,
    amount: 1
  }));

  await Promise.all(
    transferData.map((transfer) => AccountService.transfer(transfer))
  );

  console.log(`Customers: ${JSON.stringify(customers, null, 2)}`);
  console.log(`Accounts: ${JSON.stringify(accounts, null, 2)}`);
}

export { seedDatabase };
