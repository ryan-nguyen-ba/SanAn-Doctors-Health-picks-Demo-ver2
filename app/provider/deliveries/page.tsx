"use client";

import { ProviderLayout } from "@/components/shared/ProviderLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DeliveriesPage() {
  const mockDeliveries = [
    { id: 1, date: "2025-01-15", tenant: "企業A", status: "配送済み" },
    { id: 2, date: "2025-01-20", tenant: "企業B", status: "準備中" },
    { id: 3, date: "2025-01-25", tenant: "企業C", status: "予定" },
  ];

  return (
    <ProviderLayout user={{ name: "プロバイダー" }}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-black">配送スケジュール</h1>
          <Button style={{ background: 'linear-gradient(135deg, #FFD700, #FFA500)', color: 'white' }}>
            新規配送追加
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockDeliveries.map((delivery) => (
            <Card key={delivery.id} className="bg-white shadow-md border-2 border-gray-100 hover:shadow-xl hover:border-yellow-200 transition-all">
              <CardHeader>
                <CardTitle className="font-black text-black">配送 #{delivery.id}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-medium text-black">日付: {delivery.date}</p>
                <p className="text-sm font-medium text-black">テナント: {delivery.tenant}</p>
                <p className="text-sm font-medium text-black">ステータス: {delivery.status}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ProviderLayout>
  );
}

