"use client";

import { ProviderLayout } from "@/components/shared/ProviderLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function TenantsPage() {
  const mockTenants = [
    { id: 1, name: "株式会社A", employees: 500, plan: "プレミアム" },
    { id: 2, name: "株式会社B", employees: 300, plan: "スタンダード" },
    { id: 3, name: "株式会社C", employees: 150, plan: "ベーシック" },
  ];

  return (
    <ProviderLayout user={{ name: "プロバイダー" }}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-black">テナント管理</h1>
          <Button style={{ background: 'linear-gradient(135deg, #FFD700, #FFA500)', color: 'white' }}>
            新規テナント追加
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockTenants.map((tenant) => (
            <Card key={tenant.id} className="bg-white shadow-md border-2 border-gray-100 hover:shadow-xl hover:border-yellow-200 transition-all">
              <CardHeader>
                <CardTitle className="font-black text-black">{tenant.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-medium text-black">従業員数: {tenant.employees}人</p>
                <p className="text-sm font-medium text-black">プラン: {tenant.plan}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ProviderLayout>
  );
}

