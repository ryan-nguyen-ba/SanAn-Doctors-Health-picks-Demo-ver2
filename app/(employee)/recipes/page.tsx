"use client";

import { EmployeeLayout } from "@/components/shared/EmployeeLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Clock, Target } from "lucide-react";

const recipes = [
  {
    id: "1",
    title: "夜を取り戻す、スマホ断ちレシピ",
    description:
      "ブルーライトが睡眠の質を下げる原因。就寝2時間前からスマホを手放して、自然な睡眠リズムを取り戻そう。",
    duration: "14日",
    objective: "睡眠の質向上",
    tags: ["睡眠", "リズム改善"],
    imageEmoji: "📱",
  },
  {
    id: "2",
    title: "寝る2時間前スマホOFF習慣",
    description: "今夜、寝る30分前からスマホやPC、テレビなどの画面を見るのをやめてみよう。",
    duration: "14日",
    objective: "メラトニン改善",
    tags: ["睡眠", "デジタルデトックス"],
    imageEmoji: "🛌",
  },
  {
    id: "3",
    title: "疲れ知らずのカラダをつくるレシピ",
    description: "毎日、同じでも疲れ知らずでいない。日中に集中できない時など、に生じること。",
    duration: "10日",
    objective: "疲労回復",
    tags: ["疲労回復", "集中力"],
    imageEmoji: "💼",
  },
  {
    id: "4",
    title: "病気に負けない「腸活」",
    description: "腸内環境を整えて、免疫力を高めるレシピ。",
    duration: "7日",
    objective: "免疫力",
    tags: ["腸活", "免疫"],
    imageEmoji: "🏃",
  },
];

export default function RecipesPage() {
  return (
    <EmployeeLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">レシピ</h1>
          <p className="text-gray-600">目的別にレシピを選んで、健康習慣をサポート</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <Card
              key={recipe.id}
              className="overflow-hidden card-hover border-2 border-transparent hover:border-primary/20 shadow-soft"
            >
              <div className="h-44 bg-gradient-to-br from-blue-100 via-blue-50 to-cyan-100 flex items-center justify-center">
                <div className="w-20 h-20 bg-white/80 rounded-xl flex items-center justify-center border-4 border-blue-200">
                  <span className="text-4xl">{recipe.imageEmoji}</span>
                </div>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold text-gray-900 leading-tight line-clamp-2">
                  {recipe.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 pb-5 space-y-3">
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                  {recipe.description}
                </p>
                <div className="flex items-center space-x-2 text-sm text-gray-700">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="font-semibold">{recipe.duration}</span>
                  <Target className="w-4 h-4 text-primary ml-2" />
                  <span className="text-gray-600">{recipe.objective}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recipe.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Link href={`/recipes/${recipe.id}`}>
                  <Button className="w-full font-semibold">レシピを見る</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </EmployeeLayout>
  );
}


