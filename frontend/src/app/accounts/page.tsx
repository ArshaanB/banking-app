'use client';

import type React from 'react';
import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';

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
import {
  Users,
  Search,
  XCircle,
  User,
  ArrowUpDown,
  CheckCircle
} from 'lucide-react';
import CreateNewEntity from '@/components/create-new-entity';

export default function Accounts() {
  const [accountId, setAccountId] = useState('');
  const [fromAccountId, setFromAccountId] = useState('');
  const [toAccountId, setToAccountId] = useState('');
  const [transferAmount, setTransferAmount] = useState('');

  const createAccountMutationFn = (args: {
    customerId: string;
    balance: number;
  }) => apiClient.createAccount(args);

  const {
    data: account,
    isSuccess: isSearchAccountSuccess,
    isError: isSearchAccountError,
    isRefetching: isSearchAccountRefetching,
    refetch: searchAccount
  } = useQuery({
    queryKey: ['account', accountId],
    queryFn: () => apiClient.getAccountById(accountId),
    enabled: false
  });

  const {
    mutate: transferMoney,
    isPending: isTransferring,
    isSuccess: isTransferSuccess,
    isError: isTransferError,
    data: transferResult,
    error: transferError
  } = useMutation({
    mutationFn: (args: {
      fromAccountId: string;
      toAccountId: string;
      amount: number;
    }) => apiClient.transferMoney(args)
  });

  const handleSearchAccount = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (accountId.trim()) {
      searchAccount();
    }
  };

  const handleTransferMoney = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (fromAccountId.trim() && toAccountId.trim() && transferAmount.trim()) {
      transferMoney({
        fromAccountId,
        toAccountId,
        amount: parseFloat(transferAmount)
      });
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
              <h2 className="text-3xl font-bold tracking-tight">Accounts</h2>
              <p className="text-muted-foreground mt-1">
                Create new accounts and search existing ones
              </p>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Column - Create Account */}
          <CreateNewEntity
            mutationFn={createAccountMutationFn}
            entityTitle="Account"
            initialState={{ customerId: '', balance: 0 }}
          >
            {(args, setArgs, isPending) => (
              <>
                <div className="space-y-2">
                  <Label htmlFor="customerId">Customer ID</Label>
                  <Input
                    id="customerId"
                    type="text"
                    placeholder="Enter customer ID"
                    value={args.customerId}
                    onChange={(e) =>
                      setArgs((prev) => ({
                        ...prev,
                        customerId: e.target.value
                      }))
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="balance">Balance</Label>
                  <Input
                    id="balance"
                    type="number"
                    placeholder="Enter balance"
                    value={args.balance}
                    onChange={(e) =>
                      setArgs((prev) => ({
                        ...prev,
                        balance: parseFloat(e.target.value)
                      }))
                    }
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={
                    isPending || !args.customerId.trim() || !args.balance
                  }
                >
                  {isPending ? 'Creating...' : 'Create Account'}
                </Button>
              </>
            )}
          </CreateNewEntity>
          {/* Right Column - Search Account */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Search className="h-5 w-5 text-blue-600" />
                  <CardTitle>Search Account</CardTitle>
                </div>
                <CardDescription>Find an account by their ID</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSearchAccount} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="accountId">Account ID</Label>
                    <Input
                      id="accountId"
                      type="text"
                      placeholder="Enter account ID"
                      value={accountId}
                      onChange={(e) => setAccountId(e.target.value)}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={!accountId.trim()}
                  >
                    {isSearchAccountRefetching
                      ? 'Searching...'
                      : 'Search Account'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Search Results */}
            {isSearchAccountSuccess && (
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-green-600" />
                    <CardTitle>Account Found</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-3">
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <span className="font-medium text-sm">Account ID:</span>
                      <span className="text-sm">{account?.id}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <span className="font-medium text-sm">Customer ID:</span>
                      <span className="text-sm">{account?.customerId}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <span className="font-medium text-sm">Balance:</span>
                      <span className="text-sm">{account?.balance}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <span className="font-medium text-sm">Created:</span>
                      <span className="text-sm">
                        {account?.createdAt
                          ? new Date(account.createdAt).toLocaleDateString(
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
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Search Error */}
            {isSearchAccountError && (
              <Alert className="border-red-200 bg-red-50">
                <XCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  {`No account found with ID: ${accountId}`}
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>
        <div className="grid gap-8 lg:grid-cols-2 mt-8">
          <div className="space-y-6">
            {/* Transfer Money Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <ArrowUpDown className="h-5 w-5 text-purple-600" />
                  <CardTitle>Transfer Money</CardTitle>
                </div>
                <CardDescription>
                  Transfer funds between accounts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleTransferMoney} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fromAccountId">From Account ID</Label>
                    <Input
                      id="fromAccountId"
                      type="text"
                      placeholder="Enter source account ID"
                      value={fromAccountId}
                      onChange={(e) => setFromAccountId(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="toAccountId">To Account ID</Label>
                    <Input
                      id="toAccountId"
                      type="text"
                      placeholder="Enter destination account ID"
                      value={toAccountId}
                      onChange={(e) => setToAccountId(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="transferAmount">Transfer Amount</Label>
                    <Input
                      id="transferAmount"
                      type="number"
                      step="0.01"
                      min="0.01"
                      placeholder="0.00"
                      value={transferAmount}
                      onChange={(e) => setTransferAmount(e.target.value)}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={
                      isTransferring ||
                      !fromAccountId.trim() ||
                      !toAccountId.trim() ||
                      !transferAmount.trim()
                    }
                  >
                    {isTransferring
                      ? 'Processing Transfer...'
                      : 'Transfer Money'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Transfer Result Banner */}
            {(isTransferSuccess || isTransferError) && (
              <Alert
                className={
                  isTransferSuccess
                    ? 'border-green-200 bg-green-50'
                    : 'border-red-200 bg-red-50'
                }
              >
                <div className="flex items-center space-x-2">
                  {isTransferSuccess ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-600" />
                  )}
                  <AlertDescription
                    className={
                      isTransferSuccess ? 'text-green-800' : 'text-red-800'
                    }
                  >
                    {isTransferSuccess
                      ? `Transfer successful with ID: ${transferResult?.id}`
                      : `Transfer failed: ${transferError?.message}`}
                  </AlertDescription>
                </div>
              </Alert>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
