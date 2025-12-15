"use client";

import { useState } from "react";
import { AdminLayout } from "@/components/shared/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    line: true,
    push: false,
  });

  const nonIntakeUsers = [
    { id: "1", name: "山田太郎", email: "yamada@example.com", days: 3, lastIntake: "2024-01-12" },
    { id: "2", name: "佐藤花子", email: "sato@example.com", days: 5, lastIntake: "2024-01-10" },
    { id: "3", name: "鈴木一郎", email: "suzuki@example.com", days: 2, lastIntake: "2024-01-13" },
    { id: "4", name: "田中花子", email: "tanaka@example.com", days: 7, lastIntake: "2024-01-08" },
  ];

  const sendHistory = [
    { id: "1", date: "2024-01-15 10:00", type: "メール", recipients: 12, status: "送信済み" },
    { id: "2", date: "2024-01-14 14:30", type: "LINE", recipients: 8, status: "送信済み" },
    { id: "3", date: "2024-01-13 09:00", type: "メール", recipients: 15, status: "送信済み" },
  ];

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">通知・リマインド管理</h1>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>通知設定状況</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="email"
                checked={notifications.email}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, email: checked as boolean })
                }
              />
              <label htmlFor="email" className="text-sm font-medium">
                メール通知: ON
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="line"
                checked={notifications.line}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, line: checked as boolean })
                }
              />
              <label htmlFor="line" className="text-sm font-medium">
                LINE通知: ON
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="push"
                checked={notifications.push}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, push: checked as boolean })
                }
              />
              <label htmlFor="push" className="text-sm font-medium">
                プッシュ通知: OFF
              </label>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6 shadow-medium">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold text-gray-900">未服用者リスト</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              {nonIntakeUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:border-primary/20 transition-all"
                >
                  <div className="flex-1">
                    <p className="font-bold text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                      <span>{user.days}日間未服用</span>
                      <span>最終服用: {user.lastIntake}</span>
                    </div>
                  </div>
                  <Badge variant="destructive" className="ml-4">要督促</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6 shadow-medium">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold text-gray-900">送信履歴</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              {sendHistory.map((history) => (
                <div
                  key={history.id}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <Badge variant="secondary">{history.type}</Badge>
                      <Badge className="bg-green-500">{history.status}</Badge>
                    </div>
                    <p className="text-sm text-gray-600">送信日時: {history.date}</p>
                    <p className="text-xs text-gray-500 mt-1">送信先: {history.recipients}名</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-medium">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold text-gray-900">督促テンプレート送信</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">件名</label>
              <Input
                placeholder="サプリメント服用のお願い"
                className="rounded-xl border-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">本文</label>
              <textarea
                className="w-full p-3 border-2 rounded-xl"
                rows={6}
                placeholder="テンプレートを入力..."
              />
            </div>
            <div className="flex items-center space-x-2">
              <Button className="font-semibold shadow-sm">一括送信</Button>
              <Button variant="outline" className="font-semibold">テンプレートを保存</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}

