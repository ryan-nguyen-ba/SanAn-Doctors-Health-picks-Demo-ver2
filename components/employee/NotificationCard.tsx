"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, MessageSquare, Megaphone, Package, CreditCard } from "lucide-react";

interface NotificationCardProps {
  type: "announcement" | "chat" | "alert" | "delivery" | "payment";
  count: number;
  title: string;
  content: string[];
}

const icons = {
  announcement: Bell,
  chat: MessageSquare,
  alert: Megaphone,
  delivery: Package,
  payment: CreditCard,
};

export function NotificationCard({ type, count, title, content }: NotificationCardProps) {
  const Icon = icons[type];

  const iconColors = {
    announcement: { bg: 'from-blue-400 to-blue-600', icon: 'text-white' },
    chat: { bg: 'from-green-400 to-green-600', icon: 'text-white' },
    alert: { bg: 'from-orange-400 to-orange-600', icon: 'text-white' },
    delivery: { bg: 'from-purple-400 to-purple-600', icon: 'text-white' },
    payment: { bg: 'from-pink-400 to-pink-600', icon: 'text-white' },
  };

  const colors = iconColors[type];

  return (
    <Card className="bg-white shadow-md border-2 border-gray-100 hover:shadow-xl hover:border-yellow-200 transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`p-2.5 bg-gradient-to-br ${colors.bg} rounded-xl shadow-md`}>
                <Icon className={`w-5 h-5 ${colors.icon}`} />
              </div>
              <CardTitle className="text-base font-bold" style={{ color: '#8B4513' }}>{title}</CardTitle>
            </div>
          {count > 0 && (
            <Badge className="rounded-full min-w-[24px] h-6 flex items-center justify-center text-xs font-bold bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-md">
              {count}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <ul className="space-y-2">
          {content.map((item, index) => (
            <li key={index} className="text-sm leading-relaxed font-medium" style={{ color: '#A0522D' }}>
              • {item}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

