"use client";

import { AdminLayout } from "@/components/shared/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AdminReportsPage() {
  const overallReports = [
    { category: "頭痛", count: 15 },
    { category: "めまい", count: 8 },
    { category: "吐き気", count: 5 },
    { category: "下痢", count: 3 },
  ];

  const departmentReports = [
    { department: "営業", reports: 12 },
    { department: "開発", reports: 8 },
    { department: "人事", reports: 5 },
  ];

  const keywords = [
    { word: "頭痛", frequency: 15 },
    { word: "めまい", frequency: 8 },
    { word: "疲労", frequency: 12 },
    { word: "不眠", frequency: 10 },
  ];

  const feedback = [
    {
      id: "1",
      text: "サプリメントを服用してから体調が良くなりました",
      date: "2023-09-28",
    },
    {
      id: "2",
      text: "チャレンジが楽しく続けられています",
      date: "2023-09-27",
    },
  ];

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">副作用・体調レポート</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>全体健康報告</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={overallReports}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#FF6B6B" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>部署別健康報告</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={departmentReports}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="department" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="reports" fill="#4ECDC4" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>キーワード出現頻度</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {keywords.map((item) => (
                <div key={item.word} className="flex items-center justify-between">
                  <Badge variant="secondary">{item.word}</Badge>
                  <span className="font-semibold">{item.frequency}回</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>匿名フィードバック一覧</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {feedback.map((item) => (
                <div key={item.id} className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">{item.date}</p>
                  <p className="text-gray-900">{item.text}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}

