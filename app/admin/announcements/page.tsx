"use client";

import { useState } from "react";
import { AdminLayout } from "@/components/shared/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function AdminAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState([
    {
      id: "1",
      title: "キャンペーンの期間のお知らせ",
      content: "10月1日から新キャンペーンを開始します",
      isActive: true,
      date: "2023-09-28",
    },
  ]);

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">お知らせ発信機能</h1>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>お知らせ一覧</CardTitle>
              <Button>新規作成</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {announcements.map((announcement) => (
                <div
                  key={announcement.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <p className="font-semibold">{announcement.title}</p>
                      {announcement.isActive && (
                        <Badge variant="default">公開中</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{announcement.content}</p>
                    <p className="text-xs text-gray-500 mt-1">{announcement.date}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      編集
                    </Button>
                    <Button variant="outline" size="sm">
                      削除
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>新規お知らせ作成</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">件名</label>
              <Input placeholder="お知らせの件名" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">内容</label>
              <textarea
                className="w-full p-3 border rounded-lg"
                rows={6}
                placeholder="お知らせの内容"
              />
            </div>
            <Button>発信</Button>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}

