import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Users,
  CreditCard,
  ArrowLeftRight,
  Plus,
  ArrowUpDown,
  Eye
} from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="min-h-screen bg-background">
        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight">
              Welcome to your dashboard
            </h2>
            <p className="text-muted-foreground mt-2">
              Manage your customers, accounts, and transactions all in one
              place.
            </p>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Customers Card */}
            <Card className="relative overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Customers</CardTitle>
                    <CardDescription>Manage your customers</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 flex flex-col justify-between h-full">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                    <Plus className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">
                      Create a new customer
                    </span>
                  </div>
                </div>
                <Link href="/customers">
                  <Button className="w-full cursor-pointer" size="sm">
                    Manage Customers
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Accounts Card */}
            <Card className="relative overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CreditCard className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Accounts</CardTitle>
                    <CardDescription>Account management tools</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 flex flex-col justify-between h-full">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                    <Plus className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">
                      Create a new account
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                    <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">
                      Transfer money between accounts
                    </span>
                  </div>
                </div>
                <Link href="/accounts">
                  <Button className="w-full cursor-pointer" size="sm">
                    Manage Accounts
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Transactions Card */}
            <Card className="relative overflow-hidden md:col-span-2 lg:col-span-1">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <ArrowLeftRight className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Transactions</CardTitle>
                    <CardDescription>
                      View and track transactions
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 flex flex-col justify-between h-full">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                    <Eye className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">
                      See transactions for a given account
                    </span>
                  </div>
                </div>
                <Link href="/transactions">
                  <Button className="w-full cursor-pointer" size="sm">
                    View Transactions
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
