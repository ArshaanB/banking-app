'use client';

import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { apiClient, Customer } from '@/lib/api';

export default function Customers() {
  const [name, setName] = useState('');
  const [createdCustomer, setCreatedCustomer] = useState<Customer | null>(null);
  const [customerId, setCustomerId] = useState('');

  const { mutate: createCustomer } = useMutation({
    mutationFn: (name: string) => apiClient.createCustomer({ name }),
    onSuccess: (data) => {
      setCreatedCustomer(data);
    }
  });

  const { data: customer } = useQuery({
    queryKey: ['customer', customerId],
    queryFn: () => apiClient.getCustomerById(customerId),
    enabled: !!customerId
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createCustomer(name);
  };
  return (
    <div className="flex flex-col gap-4 py-10 px-20">
      <h1 className="text-4xl font-bold">Create Customer</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
          <button type="submit">Create Customer</button>
        </div>
        <div>
          <input
            type="text"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            placeholder="Customer ID"
          />
          <button type="button">Get Customer</button>
        </div>
      </form>
      <h2 className="text-2xl font-bold">Created Customer</h2>
      {createdCustomer && <div>{createdCustomer.id}</div>}
      <h2 className="text-2xl font-bold">Retrieved Customer</h2>
      {customer && <div>{customer.name}</div>}
    </div>
  );
}
