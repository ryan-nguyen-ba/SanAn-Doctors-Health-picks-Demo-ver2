"use client";

import { ProviderLayout } from "@/components/shared/ProviderLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { Download } from "lucide-react";

export default function AnalyticsPage() {
  const mockStats = [
    { label: "総ユーザー数", value: "950", trend: "+12%" },
    { label: "アクティブチャレンジ", value: "15", trend: "+3" },
    { label: "今月の配送", value: "342", trend: "+8%" },
    { label: "完了ミッション", value: "12,450", trend: "+15%" },
  ];

  const challengeTrends = [
    { month: "1月", participants: 120, completions: 85 },
    { month: "2月", participants: 145, completions: 110 },
    { month: "3月", participants: 165, completions: 135 },
    { month: "4月", participants: 180, completions: 150 },
  ];

  const questionnaireData = [
    { category: "睡眠", count: 320 },
    { category: "疲労", count: 280 },
    { category: "ストレス", count: 250 },
    { category: "食生活", count: 200 },
  ];

  const challengeParticipation = [
    { challenge: "睡眠改善", participants: 180, completionRate: 75 },
    { challenge: "運動習慣", participants: 150, completionRate: 68 },
    { challenge: "食事改善", participants: 120, completionRate: 72 },
  ];

  const COLORS = ['#FFD700', '#FFA500', '#FF6B6B', '#4ECDC4'];

  const handleCSVExport = () => {
    const csv = [
      "カテゴリ,値",
      `総ユーザー数,950`,
      `アクティブチャレンジ,15`,
      `今月の配送,342`,
      `完了ミッション,12450`,
      "",
      "月,参加者数,完了数",
      ...challengeTrends.map(d => `${d.month},${d.participants},${d.completions}`),
      "",
      "カテゴリ,回答数",
      ...questionnaireData.map(d => `${d.category},${d.count}`),
    ].join("\n");

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ProviderLayout user={{ name: "プロバイダー" }}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-black">データ分析</h1>
          <Button 
            onClick={handleCSVExport}
            variant="outline"
          >
            <Download className="w-4 h-4 mr-2" />
            CSVエクスポート
          </Button>
        </div>

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-medium">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-gray-900">チャレンジ実施状況推移</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={challengeTrends} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
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
                    dataKey="participants"
                    stroke="#FFD700"
                    strokeWidth={3}
                    name="参加者数"
                    dot={{ fill: '#FFD700', r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="completions"
                    stroke="#4ECDC4"
                    strokeWidth={3}
                    name="完了数"
                    dot={{ fill: '#4ECDC4', r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-medium">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-gray-900">アンケートカテゴリ別集計</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={questionnaireData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {questionnaireData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-medium">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold text-gray-900">チャレンジ別参加状況</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={challengeParticipation} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="challenge" tick={{ fill: '#6B7280', fontSize: 12 }} />
                <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }} 
                />
                <Bar dataKey="participants" fill="#FFD700" name="参加者数" radius={[8, 8, 0, 0]} />
                <Bar dataKey="completionRate" fill="#4ECDC4" name="完了率 (%)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </ProviderLayout>
  );
}


