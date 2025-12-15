"use client";

import { ProviderLayout } from "@/components/shared/ProviderLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Package, ShoppingCart, Building, Users, TrendingUp, Activity } from "lucide-react";

export default function ProviderDashboardPage() {
  // Mock data
  const stats = {
    totalIngredients: 45,
    totalProducts: 28,
    activeTenants: 12,
    totalUsers: 1250,
  };

  const productTrends = [
    { month: "1月", products: 20 },
    { month: "2月", products: 22 },
    { month: "3月", products: 25 },
    { month: "4月", products: 28 },
  ];

  const tenantGrowth = [
    { month: "1月", tenants: 8 },
    { month: "2月", tenants: 9 },
    { month: "3月", tenants: 11 },
    { month: "4月", tenants: 12 },
  ];

  const recentActivities = [
    { id: "1", type: "商品追加", description: "マグネシウムαが追加されました", date: "2024-01-15" },
    { id: "2", type: "テナント追加", description: "株式会社サンプルが登録されました", date: "2024-01-14" },
    { id: "3", type: "配信スケジュール", description: "睡眠改善チャレンジの配信が予約されました", date: "2024-01-13" },
  ];

  return (
    <ProviderLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">プロバイダーダッシュボード</h1>
          <p className="text-gray-600">コンテンツとテナント管理の概要</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="card-hover border-2 border-primary/10 bg-gradient-to-br from-primary-light/20 to-white">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-lg font-bold text-gray-900">
                <div className="p-2 bg-primary rounded-lg">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <span>成分数</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-4xl font-bold text-primary mb-1">{stats.totalIngredients}</p>
              <p className="text-sm text-gray-600 font-medium">登録済み</p>
            </CardContent>
          </Card>

          <Card className="card-hover border-2 border-accent-blue/10 bg-gradient-to-br from-accent-blue/10 to-white">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-lg font-bold text-gray-900">
                <div className="p-2 bg-accent-blue rounded-lg">
                  <ShoppingCart className="w-5 h-5 text-white" />
                </div>
                <span>商品数</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-4xl font-bold text-accent-blue mb-1">{stats.totalProducts}</p>
              <p className="text-sm text-gray-600 font-medium">アクティブ</p>
            </CardContent>
          </Card>

          <Card className="card-hover border-2 border-green-500/10 bg-gradient-to-br from-green-500/10 to-white">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-lg font-bold text-gray-900">
                <div className="p-2 bg-green-500 rounded-lg">
                  <Building className="w-5 h-5 text-white" />
                </div>
                <span>テナント数</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-4xl font-bold text-green-600 mb-1">{stats.activeTenants}</p>
              <p className="text-sm text-gray-600 font-medium">アクティブ</p>
            </CardContent>
          </Card>

          <Card className="card-hover border-2 border-purple-500/10 bg-gradient-to-br from-purple-500/10 to-white">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-lg font-bold text-gray-900">
                <div className="p-2 bg-purple-500 rounded-lg">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <span>総ユーザー数</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-4xl font-bold text-purple-600 mb-1">{stats.totalUsers.toLocaleString()}</p>
              <p className="text-sm text-gray-600 font-medium">全テナント合計</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="shadow-medium">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-gray-900">商品数の推移</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={productTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="products" stroke="#FFB800" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-medium">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-gray-900">テナント数の推移</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={tenantGrowth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="tenants" fill="#4ECDC4" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activities */}
        <Card className="shadow-medium">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold text-gray-900">最近のアクティビティ</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:border-primary/20 transition-all"
                >
                  <div className="p-2 bg-primary-light rounded-lg">
                    <Activity className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-900">{activity.type}</p>
                    <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                    <p className="text-xs text-gray-500 mt-2">{activity.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </ProviderLayout>
  );
}

