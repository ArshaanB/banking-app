'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, CreditCard, ArrowLeftRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigationItems = [
  {
    name: 'Home',
    href: '/',
    icon: Home
  },
  {
    name: 'Customers',
    href: '/customers',
    icon: Users
  },
  {
    name: 'Accounts',
    href: '/accounts',
    icon: CreditCard
  },
  {
    name: 'Transactions',
    href: '/transactions',
    icon: ArrowLeftRight
  }
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center space-x-6 lg:space-x-8">
      {navigationItems.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary',
              pathname === item.href
                ? 'text-foreground'
                : 'text-muted-foreground'
            )}
          >
            <Icon className="h-4 w-4" />
            <span>{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
