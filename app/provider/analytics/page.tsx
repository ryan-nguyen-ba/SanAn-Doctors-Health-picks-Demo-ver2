"use client";

import { ProviderLayout } from "@/components/shared/ProviderLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { BarChart3, TrendingUp, Users, Target } from "lucide-react";

export default function AnalyticsPage() {
  // Mock data
  const surveyData = [
    { month: "1月", responses: 850 },
    { month: "2月", responses: 920 },
    { month: "3月", responses: 1050 },
    { month: "4月", responses: 1120 },
  ];

  const challengeParticipation = [
    { challenge: "睡眠改善", participants: 450, completion: 320 },
    { challenge: "疲労回復", participants: 380, completion: 280 },
    { challenge: "ストレス管理", participants: 290, completion: 210 },
  ];

  const salesByTenant = [
    { tenant: "企業A", sales: 1250000 },
    { tenant: "企業B", sales: 980000 },
    { tenant: "企業C", sales: 750000 },
    { tenant: "企業D", sales: 620000 },
  ];

  const challengeCompletionRate = [
    { name: "完了", value: 65, color: "#4ECDC4" },
    { name: "進行中", value: 25, color: "#FFB800" },
    { name: "未開始", value: 10, color: "#E0E0E0" },
  ];

  return (
    <ProviderLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">データ分析</h1>
          <p className="text-gray-600">アンケート・チャレンジ・企業売上の集計</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="card-hover border-2 border-primary/10 bg-gradient-to-br from-primary-light/20 to-white">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-lg font-bold text-gray-900">
                <div className="p-2 bg-primary rounded-lg">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <span>総アンケート回答数</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-4xl font-bold text-primary mb-1">3,940</p>
              <p className="text-sm text-gray-600 font-medium">4月累計</p>
            </CardContent>
          </Card>

          <Card className="card-hover border-2 border-accent-blue/10 bg-gradient-to-br from-accent-blue/10 to-white">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-lg font-bold text-gray-900">
                <div className="p-2 bg-accent-blue rounded-lg">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <span>チャレンジ参加者</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-4xl font-bold text-accent-blue mb-1">1,120</p>
              <p className="text-sm text-gray-600 font-medium">アクティブ</p>
            </CardContent>
          </Card>

          <Card className="card-hover border-2 border-green-500/10 bg-gradient-to-br from-green-500/10 to-white">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-lg font-bold text-gray-900">
                <div className="p-2 bg-green-500 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <span>完了率</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-4xl font-bold text-green-600 mb-1">65%</p>
              <p className="text-sm text-gray-600 font-medium">平均完了率</p>
            </CardContent>
          </Card>

          <Card className="card-hover border-2 border-purple-500/10 bg-gradient-to-br from-purple-500/10 to-white">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-lg font-bold text-gray-900">
                <div className="p-2 bg-purple-500 rounded-lg">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <span>総売上</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-4xl font-bold text-purple-600 mb-1">¥3.6M</p>
              <p className="text-sm text-gray-600 font-medium">4月累計</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="shadow-medium">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-gray-900">アンケート回答数の推移</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={surveyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="responses" stroke="#FFB800" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-medium">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-gray-900">チャレンジ完了率</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={challengeCompletionRate}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {challengeCompletionRate.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-medium">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-gray-900">チャレンジ参加状況</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={challengeParticipation}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="challenge" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="participants" fill="#4ECDC4" name="参加者" />
                  <Bar dataKey="completion" fill="#FFB800" name="完了" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-medium">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-gray-900">企業別売上</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesByTenant}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="tenant" />
                  <YAxis />
                  <Tooltip formatter={(value) => `¥${value.toLocaleString()}`} />
                  <Bar dataKey="sales" fill="#9B59B6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProviderLayout>
  );
}

