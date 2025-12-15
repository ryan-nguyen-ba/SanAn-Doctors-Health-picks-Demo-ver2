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

  return (
    <Card className="card-hover border-l-4 border-l-primary">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary-light rounded-lg">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <CardTitle className="text-base font-semibold">{title}</CardTitle>
          </div>
          {count > 0 && (
            <Badge variant="destructive" className="rounded-full min-w-[24px] h-6 flex items-center justify-center text-xs font-bold shadow-sm">
              {count}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <ul className="space-y-2">
          {content.map((item, index) => (
            <li key={index} className="text-sm text-gray-700 leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

