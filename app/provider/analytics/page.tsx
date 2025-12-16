"use client";

import { ProviderLayout } from "@/components/shared/ProviderLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AnalyticsPage() {
  const mockStats = [
    { label: "総ユーザー数", value: "950", trend: "+12%" },
    { label: "アクティブチャレンジ", value: "15", trend: "+3" },
    { label: "今月の配送", value: "342", trend: "+8%" },
    { label: "完了ミッション", value: "12,450", trend: "+15%" },
  ];

  return (
    <ProviderLayout user={{ name: "プロバイダー" }}>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-black">データ分析</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockStats.map((stat, index) => (
            <Card key={index} className="bg-white shadow-md border-2 border-gray-100 hover:shadow-xl hover:border-yellow-200 transition-all">
              <CardHeader>
                <CardTitle className="text-sm font-bold text-black">{stat.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-black text-black">{stat.value}</p>
                <p className="text-sm text-green-600 mt-1 font-bold">{stat.trend}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ProviderLayout>
  );
}

