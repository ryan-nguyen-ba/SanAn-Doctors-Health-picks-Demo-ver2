"use client";

import { AdminLayout } from "@/components/shared/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Users, TrendingUp, Activity, AlertTriangle } from "lucide-react";

export default function AdminDashboardPage() {
  // Mock data
  const utilizationData = [
    { month: "1月", rate: 45 },
    { month: "2月", rate: 58 },
    { month: "3月", rate: 65 },
    { month: "4月", rate: 72 },
  ];

  const continuationData = [
    { month: "1月", rate: 35 },
    { month: "2月", rate: 48 },
    { month: "3月", rate: 55 },
    { month: "4月", rate: 62 },
  ];

  const scoreDistribution = [
    { range: "0-200", count: 15 },
    { range: "201-400", count: 25 },
    { range: "401-600", count: 35 },
    { range: "601-800", count: 20 },
    { range: "801+", count: 5 },
  ];

  const qolTrends = [
    { month: "1月", qol: 55 },
    { month: "2月", qol: 62 },
    { month: "3月", qol: 68 },
    { month: "4月", qol: 72 },
  ];

  const departmentComparison = [
    { department: "営業", score: 75, users: 45 },
    { department: "開発", score: 68, users: 32 },
    { department: "人事", score: 72, users: 18 },
    { department: "総務", score: 65, users: 25 },
  ];

  const turnoverPrediction = [
    { month: "5月", risk: 12 },
    { month: "6月", risk: 15 },
    { month: "7月", risk: 18 },
    { month: "8月", risk: 20 },
  ];

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">管理者ダッシュボード</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="card-hover border-2 border-primary/10 bg-gradient-to-br from-primary-light/20 to-white">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-lg font-bold text-gray-900">
                <div className="p-2 bg-primary rounded-lg">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <span>利用率</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-4xl font-bold text-primary mb-1">72%</p>
              <p className="text-sm text-gray-600 font-medium">前月比 <span className="text-green-600">+7%</span></p>
            </CardContent>
          </Card>

          <Card className="card-hover border-2 border-accent-blue/10 bg-gradient-to-br from-accent-blue/10 to-white">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-lg font-bold text-gray-900">
                <div className="p-2 bg-accent-blue rounded-lg">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <span>継続率</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-4xl font-bold text-accent-blue mb-1">62%</p>
              <p className="text-sm text-gray-600 font-medium">前月比 <span className="text-green-600">+7%</span></p>
            </CardContent>
          </Card>

          <Card className="card-hover border-2 border-primary/10 bg-gradient-to-br from-primary-light/20 to-white">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-lg font-bold text-gray-900">
                <div className="p-2 bg-primary rounded-lg">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <span>平均スコア</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-4xl font-bold text-primary mb-1">680</p>
              <p className="text-sm text-gray-600 font-medium">前月比 <span className="text-green-600">+45</span></p>
            </CardContent>
          </Card>

          <Card className="card-hover border-2 border-accent/10 bg-gradient-to-br from-accent/10 to-white">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-lg font-bold text-gray-900">
                <div className="p-2 bg-accent rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-white" />
                </div>
                <span>離職リスク</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-4xl font-bold text-accent mb-1">18%</p>
              <p className="text-sm text-gray-600 font-medium">予測値</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="shadow-medium">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-gray-900">利用率推移</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={utilizationData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="month" tick={{ fill: '#6B7280', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="rate" 
                    stroke="#FFD700" 
                    strokeWidth={3}
                    dot={{ fill: '#FFD700', r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-medium">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-gray-900">継続率推移</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={continuationData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="month" tick={{ fill: '#6B7280', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="rate" 
                    stroke="#4ECDC4" 
                    strokeWidth={3}
                    dot={{ fill: '#4ECDC4', r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="shadow-medium">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-gray-900">スコア分布</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={scoreDistribution} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="range" tick={{ fill: '#6B7280', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }} 
                  />
                  <Bar dataKey="count" fill="#FFD700" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-medium">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-gray-900">QOLスコア推移</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={qolTrends} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="month" tick={{ fill: '#6B7280', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="qol" 
                    stroke="#FF6B6B" 
                    strokeWidth={3}
                    dot={{ fill: '#FF6B6B', r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-medium">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-gray-900">部署別比較</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={departmentComparison} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="department" tick={{ fill: '#6B7280', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }} 
                  />
                  <Bar dataKey="score" fill="#FFD700" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-medium">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold text-gray-900">離職予測</CardTitle>
                <Badge variant="outline" className="text-xs">ベータ版: プレースホルダーデータ</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={turnoverPrediction} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="month" tick={{ fill: '#6B7280', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="risk" 
                    stroke="#FF6B6B" 
                    strokeWidth={3}
                    dot={{ fill: '#FF6B6B', r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}

