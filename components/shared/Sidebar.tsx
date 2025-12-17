"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils/cn";
import {
  Home,
  CheckSquare,
  Target,
  BookOpen,
  Pill,
  Settings,
  LogOut,
  Package,
  ShoppingCart,
  Calendar,
  Building,
  Users,
  BarChart3,
  FileText,
} from "lucide-react";

interface SidebarProps {
  user?: {
    name: string;
    nameKana?: string;
    employeeId?: string;
    profileImage?: string;
  };
  isAdmin?: boolean;
  isProvider?: boolean;
}

const employeeMenuItems = [
  { href: "/home", label: "ホーム", icon: Home },
  { href: "/challenges", label: "やること", icon: CheckSquare },
  { href: "/challenges", label: "チャレンジ", icon: Target },
  { href: "/recipes", label: "レシピ", icon: BookOpen },
  { href: "/supplements", label: "サプリ", icon: Pill },
  { href: "/settings", label: "設定", icon: Settings },
];

const adminMenuItems = [
  { href: "/admin/dashboard", label: "ダッシュボード", icon: Home },
  { href: "/admin/challenges", label: "チャレンジ分析", icon: Target },
  { href: "/admin/reports", label: "健康レポート", icon: BookOpen },
  { href: "/admin/notifications", label: "通知管理", icon: CheckSquare },
  { href: "/admin/users", label: "ユーザー管理", icon: Settings },
  { href: "/admin/sales", label: "社販管理", icon: Pill },
  { href: "/admin/announcements", label: "お知らせ", icon: Settings },
];

const providerMenuItems = [
  { href: "/provider/dashboard", label: "ダッシュボード", icon: Home },
  { href: "/provider/ingredients", label: "成分管理", icon: Package },
  { href: "/provider/products", label: "商品管理", icon: ShoppingCart },
  { href: "/provider/challenges", label: "チャレンジ管理", icon: Target },
  { href: "/provider/recipes", label: "レシピ管理", icon: BookOpen },
  { href: "/provider/missions", label: "ミッション管理", icon: CheckSquare },
  { href: "/provider/articles", label: "記事・動画配信", icon: FileText },
  { href: "/provider/deliveries", label: "配信スケジュール", icon: Calendar },
  { href: "/provider/tenants", label: "テナント管理", icon: Building },
  { href: "/provider/users", label: "ユーザー管理", icon: Users },
  { href: "/provider/analytics", label: "データ分析", icon: BarChart3 },
];

export function Sidebar({ user, isAdmin = false, isProvider = false }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const menuItems = isProvider ? providerMenuItems : isAdmin ? adminMenuItems : employeeMenuItems;

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/signin");
    router.refresh();
  };

  return (
    <div className="w-64 min-h-screen flex flex-col shadow-large" style={{ backgroundColor: '#FFD700' }}>
      {/* User Profile Section */}
      {user && (
        <div className="p-6 border-b" style={{ borderColor: 'rgba(230, 194, 0, 0.3)', backgroundColor: 'rgba(255, 215, 0, 0.5)' }}>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center font-bold text-lg shadow-medium ring-2 ring-white/50" style={{ color: '#8B4513' }}>
              {user.profileImage ? (
                <img
                  src={user.profileImage}
                  alt={user.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                user.name.charAt(0)
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-base truncate" style={{ color: '#8B4513' }}>{user.name}</p>
              {user.nameKana && (
                <p className="text-xs mt-0.5 truncate" style={{ color: '#A0522D' }}>{user.nameKana}</p>
              )}
              {user.employeeId && (
                <p className="text-xs mt-1 font-medium" style={{ color: '#A0522D' }}>
                  会員No. {user.employeeId}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200",
                    isActive
                      ? "bg-white font-bold shadow-medium"
                      : "hover:bg-white/10"
                  )}
                  style={isActive ? { color: '#8B4513' } : { color: '#8B4513' }}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Support Section */}
      <div className="p-6 border-t" style={{ borderColor: 'rgba(230, 194, 0, 0.3)', backgroundColor: 'rgba(255, 215, 0, 0.3)' }}>
        <div className="text-sm">
          <p className="font-bold mb-2" style={{ color: '#8B4513' }}>サポート窓口</p>
          <a
            href="mailto:support@healthpicks.com"
            className="hover:underline transition-colors text-xs break-all"
            style={{ color: '#A0522D' }}
          >
            support@healthpicks.com
          </a>
        </div>
      </div>

      {/* Logout */}
      <div className="p-4 border-t" style={{ borderColor: 'rgba(230, 194, 0, 0.3)' }}>
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-white/10 w-full transition-all duration-200 font-medium"
          style={{ color: '#8B4513' }}
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm">ログアウト</span>
        </button>
      </div>
    </div>
  );
}

