"use client";

import { useState } from "react";
import { EmployeeLayout } from "@/components/shared/EmployeeLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ChallengeCheckPage() {
  const [improvement, setImprovement] = useState(50);
  const [comment, setComment] = useState("");

  const historyData = [
    { date: "Week 1", value: 30 },
    { date: "Week 2", value: 45 },
    { date: "Week 3", value: 50 },
    { date: "Week 4", value: 60 },
    { date: "現在", value: improvement },
  ];

  const questions = [
    {
      id: "morning",
      question: "以前より朝スッキリ起きられるようになりましたか？",
    },
    {
      id: "energy",
      question: "日中のエネルギーレベルは向上しましたか？",
    },
    {
      id: "sleep",
      question: "睡眠の質は改善しましたか？",
    },
  ];

  return (
    <EmployeeLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">チャレンジ実感チェック</h1>
          <p className="text-gray-600">
            チャレンジの効果を主観的に評価してください
          </p>
        </div>

        <Card className="mb-6 shadow-medium">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold text-gray-900">改善度評価</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-8">
            {questions.map((q) => (
              <div key={q.id}>
                <label className="block text-sm font-medium mb-3">
                  {q.question}
                </label>
                <div className="space-y-2">
                  <Slider
                    value={improvement}
                    onValueChange={setImprovement}
                    min={0}
                    max={100}
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>悪化</span>
                    <span>変わらない</span>
                    <span>よくなった</span>
                  </div>
                  <div className="flex justify-center space-x-3 mt-4">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        className={`w-12 h-12 rounded-full border-2 font-bold transition-all shadow-sm hover:scale-110 ${
                          Math.round(improvement / 20) === num
                            ? "border-primary bg-primary text-white shadow-glow scale-110"
                            : "border-gray-300 bg-white text-gray-600 hover:border-primary/50"
                        }`}
                        onClick={() => setImprovement(num * 20)}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="mb-6 shadow-medium">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold text-gray-900">コメント（任意）</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <textarea
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              rows={5}
              placeholder="感じたことや気づきを自由に記入してください"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </CardContent>
        </Card>

        <Card className="mb-8 shadow-medium">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold text-gray-900">改善度の推移</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={historyData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="date" tick={{ fill: '#6B7280', fontSize: 12 }} />
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
                  dataKey="value"
                  stroke="#FFD700"
                  strokeWidth={3}
                  dot={{ fill: '#FFD700', r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button size="lg" className="px-12 font-bold shadow-large hover:shadow-glow">
            記録を保存
          </Button>
        </div>
      </div>
    </EmployeeLayout>
  );
}

