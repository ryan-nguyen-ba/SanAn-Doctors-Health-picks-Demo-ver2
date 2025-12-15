import { EmployeeLayout } from "@/components/shared/EmployeeLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Target, User } from "lucide-react";
import Link from "next/link";

export default async function RecipeDetailPage({
  params,
}: {
  params: { id: string };
}) {
  // Mock data - will be replaced with API call
  const recipe = {
    id: params.id,
    title: "寝る2時間前スマホOFF習慣",
    description:
      "スマートフォンのブルーライトを避け、良質な睡眠を促進する習慣です。",
    duration: 14,
    objective: "睡眠の質向上",
    expertComment:
      "ブルーライトはメラトニンの分泌を抑制し、睡眠の質を低下させます。就寝2時間前からスマートフォンやPCの使用を控えることで、自然な睡眠リズムを整えることができます。",
    components: [
      { type: "食事", description: "カフェインの摂取を午後2時までに制限" },
      { type: "睡眠", description: "就寝2時間前からデバイスをオフ" },
      { type: "運動", description: "軽いストレッチやヨガを就寝前に行う" },
    ],
  };

  const missions = [
    {
      id: "1",
      title: "スマホを別の部屋に置く",
      description: "就寝2時間前になったら、スマートフォンを寝室以外の場所に置きます。",
      day: 1,
    },
    {
      id: "2",
      title: "リラックス音楽を聴く",
      description: "代わりにリラックスできる音楽や音声を聴いて過ごします。",
      day: 2,
    },
    {
      id: "3",
      title: "読書をする",
      description: "紙の本や電子書籍リーダー（ブルーライトカット機能付き）で読書をします。",
      day: 3,
    },
  ];

  return (
    <EmployeeLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/challenges" className="text-primary hover:underline mb-4 inline-block">
            ← チャレンジに戻る
          </Link>
          <h1 className="text-3xl font-bold mb-2">{recipe.title}</h1>
          <p className="text-gray-600 mb-4">{recipe.description}</p>
        </div>

        {/* Recipe Info */}
        <Card className="mb-6 shadow-medium border-2 border-primary/10">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold text-gray-900">レシピ情報</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-primary-light/20 rounded-xl">
              <div className="p-2 bg-primary rounded-lg">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-gray-900">期間: {recipe.duration}日間</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-primary-light/20 rounded-xl">
              <div className="p-2 bg-primary rounded-lg">
                <Target className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-gray-900">目的: {recipe.objective}</span>
            </div>
          </CardContent>
        </Card>

        {/* Expert Comment */}
        <Card className="mb-6 shadow-medium bg-gradient-to-br from-primary-light/10 to-white">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary rounded-lg">
                <User className="w-5 h-5 text-white" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-900">専門家コメント</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-gray-700 leading-relaxed text-base">{recipe.expertComment}</p>
          </CardContent>
        </Card>

        {/* Components */}
        <Card className="mb-6 shadow-medium">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold text-gray-900">構成要素</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              {recipe.components.map((component, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:border-primary/20 transition-all">
                  <Badge variant="secondary" className="flex-shrink-0 shadow-sm">{component.type}</Badge>
                  <p className="text-sm text-gray-700 flex-1 leading-relaxed">{component.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Missions Preview */}
        <Card className="mb-8 shadow-medium">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold text-gray-900">ミッション一覧</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-4">
              {missions.map((mission) => (
                <div key={mission.id} className="border-l-4 border-primary pl-5 py-3 rounded-r-xl bg-primary-light/10 hover:bg-primary-light/20 transition-colors">
                  <div className="flex items-center space-x-3 mb-2">
                    <Badge variant="outline" className="font-semibold shadow-sm">Day {mission.day}</Badge>
                    <h3 className="font-bold text-gray-900">{mission.title}</h3>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{mission.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" className="flex-1 font-bold shadow-large hover:shadow-glow">
            レシピを開始
          </Button>
          <Link href={`/missions?recipe=${recipe.id}`} className="flex-1">
            <Button size="lg" variant="outline" className="w-full font-bold">
              ミッションを見る
            </Button>
          </Link>
        </div>
      </div>
    </EmployeeLayout>
  );
}

