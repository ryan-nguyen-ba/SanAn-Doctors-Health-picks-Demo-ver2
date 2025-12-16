"use client";

import { ProviderLayout } from "@/components/shared/ProviderLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProviderDashboardPage() {
  const mockStats = [
    { label: "アクティブなテナント", value: "12", icon: "🏢" },
    { label: "製品数", value: "156", icon: "📦" },
    { label: "今月の配送", value: "342", icon: "🚚" },
  ];

  return (
    <ProviderLayout user={{ name: "プロバイダー" }}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-black text-black">プロバイダーダッシュボード</h1>
          <p className="mt-2 font-medium text-black">プロバイダーコンソール</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockStats.map((stat, index) => (
            <Card key={index} className="bg-white shadow-md border-2 border-gray-100 hover:shadow-xl hover:border-yellow-200 transition-all duration-300">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-bold flex items-center space-x-2 text-black">
                  <span className="text-2xl">{stat.icon}</span>
                  <span>{stat.label}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-black text-black">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ProviderLayout>
  );
}

