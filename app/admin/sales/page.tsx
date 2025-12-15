"use client";

import { useState } from "react";
import { AdminLayout } from "@/components/shared/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminSalesPage() {
  const [settings, setSettings] = useState({
    limitAmount: 10000,
    assistanceRate: 0.3,
  });

  const coupons = [
    { code: "HEALTH2023", discount: 20, used: 45, total: 100 },
    { code: "WELLNESS2023", discount: 15, used: 32, total: 100 },
  ];

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">社販管理</h1>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>社販設定</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">上限額</label>
              <Input
                type="number"
                value={settings.limitAmount}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    limitAmount: parseInt(e.target.value),
                  })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">補助率 (%)</label>
              <Input
                type="number"
                step="0.01"
                value={settings.assistanceRate * 100}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    assistanceRate: parseFloat(e.target.value) / 100,
                  })
                }
              />
            </div>
            <Button>保存</Button>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>クーポン発行</CardTitle>
              <Button>新規発行</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {coupons.map((coupon) => (
                <div
                  key={coupon.code}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-semibold">{coupon.code}</p>
                    <p className="text-sm text-gray-600">
                      {coupon.discount}%割引
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">
                      {coupon.used}/{coupon.total} 使用済み
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>利用履歴</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="font-semibold">HEALTH2023</p>
                <p className="text-sm text-gray-600">2023-09-28 使用</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}

