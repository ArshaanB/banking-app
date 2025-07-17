'use client';

import type React from 'react';
import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { apiClient, Customer } from '@/lib/api';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Users, Search, Plus, CheckCircle, XCircle, User } from 'lucide-react';

export default function Customers() {
  const [customerName, setCustomerName] = useState('');
  const [createdCustomer, setCreatedCustomer] = useState<Customer | null>(null);
  const [customerId, setCustomerId] = useState('');

  const {
    mutate: createCustomer,
    isPending: isCreateCustomerPending,
    isSuccess: isCreateCustomerSuccess
  } = useMutation({
    mutationFn: (name: string) => apiClient.createCustomer({ name }),
    onSuccess: (data) => {
      setCreatedCustomer(data);
    }
  });

  const {
    data: customer,
    isSuccess: isSearchCustomerSuccess,
    isError: isSearchCustomerError,
    isRefetching: isSearchCustomerRefetching,
    refetch: searchCustomer
  } = useQuery({
    queryKey: ['customer', customerId],
    queryFn: () => apiClient.getCustomerById(customerId),
    enabled: false
  });

  const handleCreateCustomer = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createCustomer(customerName);
  };

  const handleSearchCustomer = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (customerId.trim()) {
      searchCustomer();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Page Heading */}
        <div className="mb-8">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
              <p className="text-muted-foreground mt-1">
                Create new customers and search existing ones
              </p>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Column - Create Customer */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Plus className="h-5 w-5 text-green-600" />
                  <CardTitle>Create New Customer</CardTitle>
                </div>
                <CardDescription>
                  Add a new customer to your database
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateCustomer} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="customerName">Customer Name</Label>
                    <Input
                      id="customerName"
                      type="text"
                      placeholder="Enter customer name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isCreateCustomerPending || !customerName.trim()}
                  >
                    {isCreateCustomerPending
                      ? 'Creating...'
                      : 'Create Customer'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Success/Error Banner */}
            {isCreateCustomerSuccess && (
              <Alert
                className={
                  isCreateCustomerSuccess
                    ? 'border-green-200 bg-green-50'
                    : 'border-red-200 bg-red-50'
                }
              >
                {isCreateCustomerSuccess ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-600" />
                )}
                <AlertDescription
                  className={
                    isCreateCustomerSuccess ? 'text-green-800' : 'text-red-800'
                  }
                >
                  {isCreateCustomerSuccess
                    ? `Customer created successfully with ID: ${createdCustomer?.id}`
                    : 'Failed to create customer'}
                </AlertDescription>
              </Alert>
            )}
          </div>

          {/* Right Column - Search Customer */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Search className="h-5 w-5 text-blue-600" />
                  <CardTitle>Search Customer</CardTitle>
                </div>
                <CardDescription>Find a customer by their ID</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSearchCustomer} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="customerId">Customer ID</Label>
                    <Input
                      id="customerId"
                      type="text"
                      placeholder="Enter customer ID"
                      value={customerId}
                      onChange={(e) => setCustomerId(e.target.value)}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={!customerId.trim()}
                  >
                    {isSearchCustomerRefetching
                      ? 'Searching...'
                      : 'Search Customer'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Search Results */}
            {isSearchCustomerSuccess && (
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-green-600" />
                    <CardTitle>Customer Found</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-3">
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <span className="font-medium text-sm">Customer ID:</span>
                      <span className="text-sm">{customer?.id}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <span className="font-medium text-sm">Name:</span>
                      <span className="text-sm">{customer?.name}</span>
                    </div>
                    {/* <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <span className="font-medium text-sm">Email:</span>
                      <span className="text-sm">{customer?.email}</span>
                    </div> */}
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <span className="font-medium text-sm">Created:</span>
                      <span className="text-sm">
                        {customer?.createdAt
                          ? new Date(customer.createdAt).toLocaleDateString(
                              'en-US',
                              {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              }
                            )
                          : 'N/A'}
                      </span>
                    </div>
                    {/* <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <span className="font-medium text-sm">Status:</span>
                      <span
                        className={`text-sm px-2 py-1 rounded-full text-xs font-medium ${
                          isSearchCustomerSuccess
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {isSearchCustomerSuccess}
                      </span>
                    </div> */}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Search Error */}
            {isSearchCustomerError && (
              <Alert className="border-red-200 bg-red-50">
                <XCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  {`No customer found with ID: ${customerId}`}
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
