"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Link from "next/link";

interface ChallengeSectionProps {
  title: string;
  level: number;
  stars: number;
  achievementRate: number;
  completedMissions: number;
  totalMissions: number;
  daysRemaining: number;
  recipes: Array<{
    id: string;
    title: string;
    description: string;
    imageUrl?: string;
    isCompleted: boolean;
  }>;
}

export function ChallengeSection({
  title,
  level,
  stars,
  achievementRate,
  completedMissions,
  totalMissions,
  daysRemaining,
  recipes,
}: ChallengeSectionProps) {
  return (
    <div className="mb-10 bg-white rounded-2xl p-6 shadow-soft border border-gray-100">
      {/* Header with avatar and challenge level */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center text-primary font-bold text-sm border-2 border-primary/20">
          加
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-900 mb-1">{title}</h2>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500">チャレンジレベル</span>
            <div className="flex space-x-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 transition-all ${
                    i < stars 
                      ? "fill-primary text-primary" 
                      : "text-gray-200"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content with recipes and progress */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Recipe Cards */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">

          {recipes.map((recipe) => (
            <Card key={recipe.id} className="overflow-hidden card-hover border-2 border-transparent hover:border-primary/20">
              {recipe.imageUrl ? (
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                    <div className="text-center p-4">
                      <div className="w-24 h-24 mx-auto mb-2 bg-white/80 rounded-lg flex items-center justify-center">
                        <span className="text-4xl">
                          {recipe.id === "1" ? "📱" : recipe.id === "2" ? "🛌" : recipe.id === "3" ? "💼" : "🏃"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden" />
              )}
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-bold text-gray-900 leading-tight">{recipe.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 pb-4">
                <p className="text-xs text-gray-600 mb-4 leading-relaxed line-clamp-2">{recipe.description}</p>
                {recipe.isCompleted ? (
                  <Button
                    variant="secondary"
                    className="w-full font-semibold text-sm shadow-sm hover:shadow-md transition-all"
                    size="sm"
                  >
                    今日も達成した
                  </Button>
                ) : (
                  <Link href={`/recipes/${recipe.id}`}>
                    <Button
                      variant="default"
                      className="w-full font-semibold text-sm shadow-sm hover:shadow-md transition-all"
                      size="sm"
                    >
                      レシピを見る
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Progress Indicator */}
        <div className="lg:w-48 flex-shrink-0 flex flex-col items-center justify-center">
          <div className="text-center mb-4">
            <p className="text-sm font-semibold text-gray-700 mb-3">ミッション達成率</p>
            <div className="relative w-32 h-32 mx-auto">
              <svg className="transform -rotate-90 w-32 h-32">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-gray-100"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={`${(achievementRate / 100) * 351.86} 351.86`}
                  strokeLinecap="round"
                  className="text-primary transition-all duration-500"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-primary">{achievementRate}%</span>
              </div>
            </div>
            <div className="mt-3 space-y-1">
              <p className="text-lg font-bold text-gray-900">
                {completedMissions}/{totalMissions}
              </p>
              <p className="text-xs text-gray-500">約{completedMissions}日</p>
              <p className="text-xs text-gray-500">あと{daysRemaining}日</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

