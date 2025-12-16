"use client";

import { AdminLayout } from "@/components/shared/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, TrendingUp, Users, DollarSign } from "lucide-react";

export default function SalesPage() {
  const mockSalesData = [
    { id: 1, product: "睡眠サポートサプリ", quantity: 150, revenue: 450000, month: "12月" },
    { id: 2, product: "集中力アップサプリ", quantity: 120, revenue: 420000, month: "12月" },
    { id: 3, product: "免疫力強化サプリ", quantity: 180, revenue: 720000, month: "12月" },
  ];

  const totalRevenue = mockSalesData.reduce((sum, item) => sum + item.revenue, 0);
  const totalQuantity = mockSalesData.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">社販管理</h1>
          <p className="text-gray-600 mt-2">従業員向け商品販売の管理</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-sm text-gray-600">
                <DollarSign className="w-4 h-4" />
                <span>総売上</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-gray-900">¥{totalRevenue.toLocaleString()}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-sm text-gray-600">
                <Package className="w-4 h-4" />
                <span>販売数</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-gray-900">{totalQuantity}個</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-sm text-gray-600">
                <Users className="w-4 h-4" />
                <span>購入者数</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-gray-900">320人</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-sm text-gray-600">
                <TrendingUp className="w-4 h-4" />
                <span>成長率</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-green-600">+15%</p>
            </CardContent>
          </Card>
        </div>

        {/* Sales List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold text-gray-900">販売実績</CardTitle>
              <div className="flex gap-2">
                <Button 
                  onClick={() => {
                    const csv = "商品名,数量,売上,月\n" + mockSalesData.map(i => `${i.product},${i.quantity},${i.revenue},${i.month}`).join("\n");
                    const blob = new Blob([csv], { type: 'text/csv' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'sales_data.csv';
                    a.click();
                  }}
                  variant="outline"
                  size="sm"
                >
                  CSVエクスポート
                </Button>
                <Button style={{ background: 'linear-gradient(135deg, #FFD700, #FFA500)', color: 'white' }}>
                  新規商品追加
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockSalesData.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-yellow-300 transition-all">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">{item.product}</h3>
                    <p className="text-sm text-gray-600">{item.month}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{item.quantity}個</p>
                    <p className="text-sm text-gray-600">¥{item.revenue.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
