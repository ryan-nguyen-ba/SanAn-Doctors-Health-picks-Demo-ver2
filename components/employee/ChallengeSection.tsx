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
    <div className="mb-10 bg-gradient-to-br from-white via-yellow-50/30 to-white rounded-3xl p-8 shadow-lg border-2 border-yellow-100 hover:shadow-xl transition-all duration-300">
      {/* Header with avatar and challenge level */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-black text-lg shadow-lg">
          加
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-black mb-2" style={{ color: '#8B4513' }}>{title}</h2>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase tracking-wide" style={{ color: '#A0522D' }}>Challenge Level</span>
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 transition-all ${
                    i < stars 
                      ? "fill-yellow-400 text-yellow-400 drop-shadow-md" 
                      : "text-gray-300"
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
            <Card key={recipe.id} className="overflow-hidden bg-white shadow-md border-2 border-gray-100 hover:shadow-xl hover:border-yellow-200 transition-all duration-300 hover:-translate-y-1">
              {recipe.imageUrl ? (
                <div className="h-48 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 relative overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center p-4">
                      <div className="w-28 h-28 mx-auto mb-2 bg-white rounded-2xl flex items-center justify-center border-2 border-yellow-300 shadow-lg">
                        <span className="text-5xl">
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
                <CardTitle className="text-base font-black leading-tight" style={{ color: '#8B4513' }}>{recipe.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 pb-4">
                <p className="text-xs mb-4 leading-relaxed line-clamp-2 font-medium" style={{ color: '#A0522D' }}>{recipe.description}</p>
                {recipe.isCompleted ? (
                  <Button
                    variant="secondary"
                    className="w-full font-bold text-sm bg-gradient-to-r from-green-400 to-emerald-500 text-white hover:from-green-500 hover:to-emerald-600 shadow-md"
                    size="sm"
                  >
                    ✓ 今日も達成した
                  </Button>
                ) : (
                  <Link href={`/recipes/${recipe.id}`}>
                    <Button
                      variant="default"
                      className="w-full font-bold text-sm text-white shadow-md hover:shadow-lg transition-all"
                      style={{ background: 'linear-gradient(135deg, #FFD700, #FFA500)' }}
                      size="sm"
                    >
                      レシピを見る →
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Progress Indicator */}
        <div className="lg:w-48 flex-shrink-0 flex flex-col items-center justify-center">
          <div className="text-center">
            <p className="text-sm font-black mb-4 uppercase tracking-wide" style={{ color: '#8B4513' }}>Mission Progress</p>
            <div className="relative w-36 h-36 mx-auto mb-4">
              {/* Outer glow ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-200 to-orange-200 opacity-30 blur-md"></div>
              
              <svg className="transform -rotate-90 w-36 h-36 relative z-10">
                <circle
                  cx="72"
                  cy="72"
                  r="64"
                  stroke="currentColor"
                  strokeWidth="10"
                  fill="transparent"
                  className="text-gray-200"
                />
                <circle
                  cx="72"
                  cy="72"
                  r="64"
                  stroke="url(#gradient)"
                  strokeWidth="10"
                  fill="transparent"
                  strokeDasharray={`${(achievementRate / 100) * 402.12} 402.12`}
                  strokeLinecap="round"
                  className="transition-all duration-500 drop-shadow-lg"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFD700" />
                    <stop offset="100%" stopColor="#FFA500" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">{achievementRate}%</span>
              </div>
            </div>
            <div className="space-y-1 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-3 border-2 border-yellow-200">
              <p className="text-xl font-black" style={{ color: '#8B4513' }}>
                {completedMissions}<span className="mx-1" style={{ color: '#D2691E' }}>/</span>{totalMissions}
              </p>
              <p className="text-xs font-bold uppercase" style={{ color: '#A0522D' }}>Missions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

