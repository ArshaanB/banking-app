import Link from 'next/link';

export default function Navigation() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)] py-10 px-20">
      <main className="flex gap-[32px] row-start-2 items-center sm:items-start">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <Link href="/customers" className="hover:underline">
          Customers
        </Link>
        <Link href="/accounts" className="hover:underline">
          Accounts
        </Link>
      </main>
    </div>
  );
}
