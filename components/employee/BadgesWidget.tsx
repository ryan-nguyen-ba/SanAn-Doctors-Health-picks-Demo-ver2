"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Award } from "lucide-react";

interface Badge {
  id: string;
  name: string;
  icon?: string;
  earnedAt: string;
}

interface BadgesWidgetProps {
  badges: Badge[];
}

export function BadgesWidget({ badges }: BadgesWidgetProps) {
  return (
    <Card className="bg-white shadow-sm border border-gray-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold text-gray-900">取得したバッジ</CardTitle>
          <Link href="/badges" className="text-sm text-primary hover:text-primary-dark font-medium transition-colors">
            全て見る →
          </Link>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          {badges.slice(0, 3).map((badge) => (
            <div key={badge.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 border border-gray-200">
                {badge.icon ? (
                  <span className="text-2xl">{badge.icon}</span>
                ) : (
                  <Award className="w-6 h-6 text-primary" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900">{badge.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {new Date(badge.earnedAt).toLocaleDateString("ja-JP", { year: "numeric", month: "2-digit", day: "2-digit" }).replace(/\//g, "/")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

