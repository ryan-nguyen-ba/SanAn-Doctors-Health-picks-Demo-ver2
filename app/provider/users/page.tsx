"use client";

import { ProviderLayout } from "@/components/shared/ProviderLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function UsersPage() {
  const mockUsers = [
    { id: 1, name: "山田太郎", email: "yamada@example.com", tenant: "企業A" },
    { id: 2, name: "佐藤花子", email: "sato@example.com", tenant: "企業B" },
    { id: 3, name: "鈴木一郎", email: "suzuki@example.com", tenant: "企業C" },
  ];

  return (
    <ProviderLayout user={{ name: "プロバイダー" }}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-black">ユーザー管理</h1>
          <Button style={{ background: 'linear-gradient(135deg, #FFD700, #FFA500)', color: 'white' }}>
            新規ユーザー追加
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockUsers.map((user) => (
            <Card key={user.id} className="bg-white shadow-md border-2 border-gray-100 hover:shadow-xl hover:border-yellow-200 transition-all">
              <CardHeader>
                <CardTitle className="font-black text-black">{user.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-medium text-black">メール: {user.email}</p>
                <p className="text-sm font-medium text-black">テナント: {user.tenant}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ProviderLayout>
  );
}

