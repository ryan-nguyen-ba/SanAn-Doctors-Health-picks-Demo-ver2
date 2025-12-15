"use client";

import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

interface AdminLayoutProps {
  children: React.ReactNode;
  user?: {
    name: string;
    nameKana?: string;
    employeeId?: string;
    profileImage?: string;
  };
}

const adminMenuItems = [
  { href: "/admin/dashboard", label: "ダッシュボード" },
  { href: "/admin/challenges", label: "チャレンジ分析" },
  { href: "/admin/reports", label: "健康レポート" },
  { href: "/admin/notifications", label: "通知管理" },
  { href: "/admin/users", label: "ユーザー管理" },
  { href: "/admin/sales", label: "社販管理" },
  { href: "/admin/announcements", label: "お知らせ" },
];

export function AdminLayout({ children, user }: AdminLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background-secondary">
      <Sidebar user={user} isAdmin={true} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 p-6 md:p-8 overflow-x-hidden">{children}</main>
      </div>
    </div>
  );
}

