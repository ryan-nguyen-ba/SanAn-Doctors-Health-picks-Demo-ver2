import { EmployeeLayout } from "@/components/shared/EmployeeLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Star, Calendar, Clock } from "lucide-react";
import Link from "next/link";

interface Recipe {
  id: string;
  title: string;
  description: string;
  duration: number;
  objective: string;
  status: "not-started" | "in-progress" | "completed";
}

export default async function ChallengeDetailPage({
  params,
}: {
  params: { id: string };
}) {
  // Mock data - will be replaced with API call
  const challenge = {
    id: params.id,
    title: "睡眠の質改善チャレンジ",
    description:
      "良質な睡眠を取るための習慣を身につけ、睡眠の質を向上させるチャレンジです。",
    level: "INTERMEDIATE",
    stars: 4,
    achievementRate: 62,
    completedMissions: 19,
    totalMissions: 30,
    currentDay: 19,
    totalDays: 30,
  };

  const recipes: Recipe[] = [
    {
      id: "1",
      title: "寝る2時間前スマホOFF習慣",
      description:
        "スマートフォンのブルーライトを避け、良質な睡眠を促進する習慣です。",
      duration: 14,
      objective: "睡眠の質向上",
      status: "in-progress",
    },
    {
      id: "2",
      title: "リラックス習慣",
      description: "就寝前のリラックス習慣を身につけます。",
      duration: 14,
      objective: "ストレス軽減",
      status: "not-started",
    },
    {
      id: "3",
      title: "睡眠環境改善",
      description: "寝室の環境を整え、快適な睡眠を実現します。",
      duration: 7,
      objective: "環境最適化",
      status: "not-started",
    },
  ];

  const timelineEvents = [
    { day: 1, recipe: "寝る2時間前スマホOFF習慣", status: "completed" },
    { day: 5, recipe: "寝る2時間前スマホOFF習慣", status: "completed" },
    { day: 10, recipe: "寝る2時間前スマホOFF習慣", status: "completed" },
    { day: 15, recipe: "寝る2時間前スマホOFF習慣", status: "in-progress" },
    { day: 19, recipe: "現在", status: "current" },
  ];

  return (
    <EmployeeLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Link href="/challenges" className="text-primary hover:underline mb-4 inline-block">
            ← チャレンジ一覧に戻る
          </Link>
          <h1 className="text-3xl font-bold mb-2">{challenge.title}</h1>
          <p className="text-gray-600 mb-4">{challenge.description}</p>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < challenge.stars
                      ? "fill-primary text-primary"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <Badge variant="outline">中級</Badge>
          </div>
        </div>

        {/* Progress Section */}
        <Card className="mb-8 shadow-medium border-2 border-primary/10">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold text-gray-900">進捗状況</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-3">
                  <span className="text-sm font-semibold text-gray-700">ミッション達成率</span>
                  <span className="text-lg font-bold text-primary">{challenge.achievementRate}%</span>
                </div>
                <Progress value={challenge.achievementRate} className="h-3" />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-4 bg-primary-light/20 rounded-xl border border-primary/10">
                  <p className="text-sm text-gray-600 mb-2 font-medium">完了ミッション</p>
                  <p className="text-3xl font-bold text-primary">
                    {challenge.completedMissions}<span className="text-lg text-gray-500">/{challenge.totalMissions}</span>
                  </p>
                </div>
                <div className="p-4 bg-primary-light/20 rounded-xl border border-primary/10">
                  <p className="text-sm text-gray-600 mb-2 font-medium">経過日数</p>
                  <p className="text-3xl font-bold text-primary">
                    {challenge.currentDay}<span className="text-lg text-gray-500">/{challenge.totalDays}日</span>
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recipes Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">レシピ一覧</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {recipes.map((recipe) => (
              <Card key={recipe.id} className="card-hover border-2 border-transparent hover:border-primary/20">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between mb-3 gap-2">
                    <CardTitle className="text-lg font-bold text-gray-900 flex-1 line-clamp-2">
                      {recipe.title}
                    </CardTitle>
                    <Badge
                      variant={
                        recipe.status === "completed"
                          ? "default"
                          : recipe.status === "in-progress"
                          ? "secondary"
                          : "outline"
                      }
                      className="flex-shrink-0 shadow-sm"
                    >
                      {recipe.status === "completed"
                        ? "完了"
                        : recipe.status === "in-progress"
                        ? "進行中"
                        : "未開始"}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="font-medium">{recipe.duration}日間</span>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-gray-600 mb-3 leading-relaxed line-clamp-2">
                    {recipe.description}
                  </p>
                  <p className="text-xs text-gray-500 mb-5 font-medium">
                    目的: {recipe.objective}
                  </p>
                  <Link href={`/recipes/${recipe.id}`}>
                    <Button className="w-full font-semibold" variant="outline">
                      詳細を見る
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Timeline Section */}
        <Card className="shadow-medium">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold text-gray-900">タイムライン</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-6">
              {timelineEvents.map((event, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div
                      className={`w-5 h-5 rounded-full border-2 border-white shadow-sm ${
                        event.status === "completed"
                          ? "bg-primary ring-2 ring-primary/20"
                          : event.status === "current"
                          ? "bg-accent ring-2 ring-accent/20"
                          : "bg-gray-300"
                      }`}
                    />
                    {index < timelineEvents.length - 1 && (
                      <div className="w-0.5 h-16 bg-gradient-to-b from-gray-200 to-gray-100 mt-2" />
                    )}
                  </div>
                  <div className="flex-1 pb-6">
                    <div className="flex items-center space-x-2 mb-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span className="text-sm font-bold text-gray-900">Day {event.day}</span>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{event.recipe}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Start Button */}
        <div className="mt-8 text-center">
          <Button size="lg" className="px-12 shadow-large hover:shadow-glow">
            チャレンジを開始
          </Button>
        </div>
      </div>
    </EmployeeLayout>
  );
}

