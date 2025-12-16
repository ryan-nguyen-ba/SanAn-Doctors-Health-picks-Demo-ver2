"use client";

import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

interface EmployeeLayoutProps {
  children: React.ReactNode;
  user?: {
    name: string;
    nameKana?: string;
    employeeId?: string;
    profileImage?: string;
  };
}

export function EmployeeLayout({ children, user }: EmployeeLayoutProps) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar user={user} />
      <div className="flex-1 flex flex-col min-w-0 bg-gray-50">
        <Header />
        <main className="flex-1 p-6 md:p-8 overflow-x-hidden bg-gray-50 text-black">
          {children}
        </main>
      </div>
    </div>
  );
}

