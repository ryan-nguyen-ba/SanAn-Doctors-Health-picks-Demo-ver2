"use client";

import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

interface ProviderLayoutProps {
  children: React.ReactNode;
  user?: {
    name: string;
    nameKana?: string;
    employeeId?: string;
    profileImage?: string;
  };
}

export function ProviderLayout({ children, user }: ProviderLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background-secondary">
      <Sidebar user={user} isProvider={true} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 p-6 md:p-8 overflow-x-hidden text-black bg-white">
          {children}
        </main>
      </div>
    </div>
  );
}

