'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { apiClient, Customer } from '@/lib/api';

export default function Home() {
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
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
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
        <h2>Created Customer</h2>
        {createdCustomer && <div>{createdCustomer.id}</div>}
        <h2>Retrieved Customer</h2>
        {customer && <div>{customer.name}</div>}
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
