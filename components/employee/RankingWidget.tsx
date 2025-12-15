"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

interface RankingWidgetProps {
  rank: number;
  total: number;
  weeklyData: Array<{ day: string; percentage: number }>;
}

export function RankingWidget({ rank, total, weeklyData }: RankingWidgetProps) {
  return (
    <Card className="shadow-soft">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold text-gray-900">週間取り組みランキング</CardTitle>
          <Link href="/ranking" className="text-sm text-primary hover:text-primary-dark font-medium transition-colors">
            詳細 →
          </Link>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="mb-5">
          <p className="text-2xl font-bold text-center text-gray-900 mb-1">
            {rank}/{total}位
          </p>
        </div>
        <ResponsiveContainer width="100%" height={150}>
          <BarChart data={weeklyData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <XAxis 
              dataKey="day" 
              tick={{ fontSize: 12, fill: '#6B7280' }}
              axisLine={{ stroke: '#E5E7EB' }}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: '#6B7280' }}
              axisLine={{ stroke: '#E5E7EB' }}
            />
            <Bar 
              dataKey="percentage" 
              fill="#FFD700"
              radius={[8, 8, 0, 0]}
              className="hover:opacity-80 transition-opacity"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

