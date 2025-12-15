"use client";

import { EmployeeLayout } from "@/components/shared/EmployeeLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Award, TrendingUp, Users } from "lucide-react";

export default function ScoreboardPage() {
  // Mock data
  const personalProgress = [
    { month: "1月", achievement: 45, continuation: 15 },
    { month: "2月", achievement: 60, continuation: 28 },
    { month: "3月", achievement: 75, continuation: 30 },
    { month: "4月", achievement: 80, continuation: 30 },
  ];

  const challengeData = [
    { name: "睡眠改善", achievement: 62, days: 19 },
    { name: "疲労回復", achievement: 45, days: 12 },
    { name: "ストレス管理", achievement: 78, days: 25 },
  ];

  const badges = [
    { name: "サプリ3種コンプリート", earned: "2023/09/22" },
    { name: "5日ミッション達成", earned: "2023/09/22" },
    { name: "30日連続ログイン", earned: "2023/09/22" },
  ];

  const comparisonData = [
    { category: "達成率", personal: 62, department: 58, company: 55 },
    { category: "継続日数", personal: 19, department: 16, company: 14 },
    { category: "スコア", personal: 850, department: 720, company: 680 },
  ];

  return (
    <EmployeeLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">チャレンジスコアボード</h1>
          <p className="text-gray-600">あなたの進捗状況と他者との比較</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="card-hover bg-gradient-to-br from-primary-light/30 to-white border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-lg font-bold text-gray-900">
                <div className="p-2 bg-primary rounded-lg">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <span>総合スコア</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-5xl font-bold text-primary mb-1">850</p>
              <p className="text-sm text-gray-600 font-medium">ポイント</p>
            </CardContent>
          </Card>

          <Card className="card-hover bg-gradient-to-br from-primary-light/30 to-white border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-lg font-bold text-gray-900">
                <div className="p-2 bg-primary rounded-lg">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <span>取得バッジ</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-5xl font-bold text-primary mb-1">{badges.length}</p>
              <p className="text-sm text-gray-600 font-medium">個</p>
            </CardContent>
          </Card>

          <Card className="card-hover bg-gradient-to-br from-primary-light/30 to-white border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-lg font-bold text-gray-900">
                <div className="p-2 bg-primary rounded-lg">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <span>ランキング</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-5xl font-bold text-primary mb-1">23</p>
              <p className="text-sm text-gray-600 font-medium">/ 264位</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="shadow-medium">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-gray-900">個人進捗グラフ</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={personalProgress} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
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
                    dataKey="achievement"
                    stroke="#FFD700"
                    strokeWidth={3}
                    name="達成率"
                    dot={{ fill: '#FFD700', r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="continuation"
                    stroke="#4ECDC4"
                    strokeWidth={3}
                    name="継続日数"
                    dot={{ fill: '#4ECDC4', r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-medium">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-gray-900">チャレンジ別達成率</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={challengeData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="name" tick={{ fill: '#6B7280', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }} 
                  />
                  <Bar dataKey="achievement" fill="#FFD700" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8 shadow-medium">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold text-gray-900">取得したバッジ</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {badges.map((badge, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-5 bg-gradient-to-r from-primary-light/20 to-white rounded-xl border border-primary/10 hover:shadow-soft transition-all"
                >
                  <div className="p-3 bg-primary rounded-xl shadow-sm">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-900">{badge.name}</p>
                    <p className="text-sm text-gray-600 mt-1">{badge.earned}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-medium">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold text-gray-900">他者との比較</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={comparisonData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="category" tick={{ fill: '#6B7280', fontSize: 12 }} />
                <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }} 
                />
                <Bar dataKey="personal" fill="#FFD700" name="あなた" radius={[8, 8, 0, 0]} />
                <Bar dataKey="department" fill="#4ECDC4" name="部署平均" radius={[8, 8, 0, 0]} />
                <Bar dataKey="company" fill="#FF6B6B" name="会社平均" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </EmployeeLayout>
  );
}

