'use client';

import { useState } from 'react';
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  ArrowLeftRight,
  Search,
  ChevronLeft,
  ChevronRight,
  XCircle,
  Receipt
} from 'lucide-react';
import { apiClient, Transaction } from '@/lib/api';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

const ITEMS_PER_PAGE = 10;

export default function TransactionsPage() {
  const [accountId, setAccountId] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  const {
    data: { transactions, hasMore } = { transactions: [], hasMore: false },
    isLoading: isSearching,
    isError: isSearchError,
    isSuccess: isSearchSuccess,
    isPlaceholderData
  } = useQuery<{ transactions: Transaction[]; hasMore: boolean }>({
    queryKey: ['transactions', accountId, currentPage],
    queryFn: () =>
      apiClient.getTransactions(accountId, currentPage, ITEMS_PER_PAGE),
    enabled: !!accountId,
    placeholderData: keepPreviousData
  });

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Page Heading */}
        <div className="mb-8">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <ArrowLeftRight className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Transactions
              </h2>
              <p className="text-muted-foreground mt-1">
                View transaction history for any account
              </p>
            </div>
          </div>
        </div>

        {/* Search Card */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Search className="h-5 w-5 text-blue-600" />
              <CardTitle>Search Transactions</CardTitle>
            </div>
            <CardDescription>
              Enter an account ID to view its transaction history
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="flex gap-4">
              <div className="flex-1 space-y-2">
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
              <div className="flex items-end">
                <Button
                  type="submit"
                  disabled={isSearching || !accountId.trim()}
                >
                  {isSearching ? 'Searching...' : 'Search Transactions'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Search Error */}
        {isSearchError && (
          <Alert className="border-red-200 bg-red-50 mb-6">
            <XCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              {`No transactions found for account ID: ${accountId}`}
            </AlertDescription>
          </Alert>
        )}

        {/* Transactions Table */}
        {isSearchSuccess && transactions && transactions.length > 0 && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Receipt className="h-5 w-5 text-green-600" />
                  <CardTitle>Transaction History</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Transaction ID</TableHead>
                      <TableHead>Transaction Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-mono text-sm">
                          {transaction.id}
                        </TableCell>
                        <TableCell className="text-sm">
                          {formatDate(transaction.createdAt)}
                        </TableCell>
                        <TableCell>{transaction.type.toUpperCase()}</TableCell>
                        <TableCell className="text-right font-medium">
                          ${transaction.amount.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-center space-x-2 mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 0}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={isPlaceholderData || !hasMore}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
