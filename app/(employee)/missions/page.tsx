"use client";

import { useState } from "react";
import { EmployeeLayout } from "@/components/shared/EmployeeLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Pill, Thermometer, Scale, AlertCircle, Camera, X } from "lucide-react";

export default function MissionsPage() {
  const [completed, setCompleted] = useState(false);
  const [temperature, setTemperature] = useState(36.5);
  const [weight, setWeight] = useState(65);
  const [nausea, setNausea] = useState(false);
  const [mealPhoto, setMealPhoto] = useState<string | null>(null);
  const [nutritionEstimate, setNutritionEstimate] = useState<any>(null);

  const mission = {
    id: "1",
    title: "スマホを別の部屋に置く",
    description:
      "就寝2時間前になったら、スマートフォンを寝室以外の場所に置きます。",
    content:
      "スマートフォンのブルーライトは睡眠の質を低下させます。就寝2時間前からスマートフォンを別の部屋に置くことで、自然な睡眠リズムを整えることができます。",
    videoUrl: null,
    day: 1,
  };

  const supplements = [
    {
      id: "1",
      name: "マグネシウムα",
      description: "睡眠の質向上に効果的",
    },
    {
      id: "2",
      name: "GABA",
      description: "リラックス効果",
    },
  ];

  const handleComplete = () => {
    setCompleted(true);
    // Add animation/score logic here
  };

  return (
    <EmployeeLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{mission.title}</h1>
          <p className="text-gray-600 mb-4">{mission.description}</p>
          <Badge variant="outline">Day {mission.day}</Badge>
        </div>

        {/* Mission Content */}
        <Card className="mb-6 shadow-medium">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold text-gray-900">ミッション内容</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-gray-700 leading-relaxed mb-4 text-base">{mission.content}</p>
            {mission.videoUrl && (
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center border-2 border-gray-200">
                <p className="text-gray-500 font-medium">動画プレーヤー</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recommended Supplements */}
        <Card className="mb-6 shadow-medium border-2 border-primary/10">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary rounded-lg">
                <Pill className="w-5 h-5 text-white" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-900">推奨サプリメント</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              {supplements.map((supplement) => (
                <div
                  key={supplement.id}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-primary-light/20 to-white rounded-xl border border-primary/10 hover:border-primary/20 transition-all"
                >
                  <div className="flex-1">
                    <p className="font-bold text-gray-900">{supplement.name}</p>
                    <p className="text-sm text-gray-600 mt-1">{supplement.description}</p>
                  </div>
                  <Button variant="outline" size="sm" className="flex-shrink-0 ml-4 font-semibold shadow-sm">
                    詳細を見る
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Completion Tracking */}
        <Card className="mb-6 shadow-medium">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold text-gray-900">実行記録</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-4">
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl border-2 border-gray-200 hover:border-primary/20 transition-all">
              <Checkbox
                id="completed"
                checked={completed}
                onCheckedChange={(checked) => setCompleted(checked as boolean)}
                className="w-5 h-5"
              />
              <label
                htmlFor="completed"
                className="text-sm font-bold leading-none cursor-pointer text-gray-900"
              >
                実行済み
              </label>
            </div>
            {completed && (
              <div className="p-6 bg-gradient-to-r from-primary-light to-primary-lighter rounded-xl border-2 border-primary/20 animate-fade-in">
                <p className="text-primary font-bold text-center text-lg mb-2">
                  おめでとうございます！ミッションを達成しました！
                </p>
                <p className="text-center text-base text-gray-700 font-semibold">
                  +10ポイント獲得
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Health Metrics */}
        <Card className="mb-6 shadow-medium">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold text-gray-900">体調管理</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-5">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Thermometer className="w-4 h-4 text-gray-500" />
                <label className="text-sm font-medium">体温</label>
              </div>
              <div className="flex items-center space-x-4">
                <Slider
                  value={temperature}
                  onValueChange={setTemperature}
                  min={35.0}
                  max={40.0}
                  step={0.1}
                  className="flex-1"
                />
                <span className="text-sm font-semibold w-16 text-right">
                  {temperature}°C
                </span>
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Scale className="w-4 h-4 text-gray-500" />
                <label className="text-sm font-medium">体重</label>
              </div>
              <div className="flex items-center space-x-4">
                <Slider
                  value={weight}
                  onValueChange={setWeight}
                  min={40}
                  max={120}
                  step={0.5}
                  className="flex-1"
                />
                <span className="text-sm font-semibold w-16 text-right">
                  {weight}kg
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="nausea"
                checked={nausea}
                onChange={(e) => setNausea(e.target.checked)}
                className="w-4 h-4"
              />
              <label htmlFor="nausea" className="text-sm font-medium">
                吐き気
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Side Effects */}
        <Card className="mb-6 shadow-medium border-2 border-accent/10">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-accent/10 rounded-lg">
                <AlertCircle className="w-5 h-5 text-accent" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-900">副作用記録</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <textarea
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              rows={5}
              placeholder="副作用や体調の変化があれば記録してください"
            />
            <Button variant="outline" className="mt-4 font-semibold shadow-sm">
              医師に相談する
            </Button>
          </CardContent>
        </Card>

        {/* Meal Photo Upload */}
        <Card className="mb-6 shadow-medium">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary rounded-lg">
                <Camera className="w-5 h-5 text-white" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-900">食事管理</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            {!mealPhoto ? (
              <div className="border-2 border-dashed border-primary/30 rounded-xl p-8 text-center bg-gradient-to-br from-primary-light/10 to-white hover:border-primary/50 transition-all">
                <Camera className="w-16 h-16 text-primary mx-auto mb-4 opacity-60" />
                <p className="text-sm text-gray-700 mb-4 font-medium">
                  食事の写真をアップロードして栄養素を推定
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        const result = event.target?.result as string;
                        setMealPhoto(result);
                        // Mock nutrition estimation
                        setTimeout(() => {
                          setNutritionEstimate({
                            calories: 650,
                            protein: 35,
                            carbs: 85,
                            fat: 18,
                            fiber: 8,
                          });
                        }, 1000);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="hidden"
                  id="meal-photo-upload"
                />
                <label htmlFor="meal-photo-upload" className="cursor-pointer">
                  <Button variant="outline" className="font-semibold shadow-sm cursor-pointer w-full">
                    写真を選択
                  </Button>
                </label>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative">
                  <img
                    src={mealPhoto}
                    alt="Meal"
                    className="w-full h-64 object-cover rounded-xl border-2 border-gray-200"
                  />
                  <button
                    onClick={() => {
                      setMealPhoto(null);
                      setNutritionEstimate(null);
                    }}
                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                  >
                    <X className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                {nutritionEstimate ? (
                  <div className="p-4 bg-gradient-to-br from-green-50 to-white rounded-xl border-2 border-green-200">
                    <h4 className="font-bold text-gray-900 mb-3">栄養素推定結果（ベータ版: プレースホルダー）</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      <div className="p-3 bg-white rounded-lg border border-gray-200">
                        <p className="text-xs text-gray-600 mb-1">カロリー</p>
                        <p className="text-lg font-bold text-gray-900">{nutritionEstimate.calories} kcal</p>
                      </div>
                      <div className="p-3 bg-white rounded-lg border border-gray-200">
                        <p className="text-xs text-gray-600 mb-1">タンパク質</p>
                        <p className="text-lg font-bold text-gray-900">{nutritionEstimate.protein} g</p>
                      </div>
                      <div className="p-3 bg-white rounded-lg border border-gray-200">
                        <p className="text-xs text-gray-600 mb-1">炭水化物</p>
                        <p className="text-lg font-bold text-gray-900">{nutritionEstimate.carbs} g</p>
                      </div>
                      <div className="p-3 bg-white rounded-lg border border-gray-200">
                        <p className="text-xs text-gray-600 mb-1">脂質</p>
                        <p className="text-lg font-bold text-gray-900">{nutritionEstimate.fat} g</p>
                      </div>
                      <div className="p-3 bg-white rounded-lg border border-gray-200">
                        <p className="text-xs text-gray-600 mb-1">食物繊維</p>
                        <p className="text-lg font-bold text-gray-900">{nutritionEstimate.fiber} g</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-gray-50 rounded-xl text-center">
                    <p className="text-sm text-gray-600">栄養素を推定中...</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="text-center">
          <Button 
            size="lg" 
            onClick={handleComplete} 
            disabled={!completed}
            className="px-12 font-bold shadow-large hover:shadow-glow disabled:opacity-50"
          >
            記録を保存
          </Button>
        </div>
      </div>
    </EmployeeLayout>
  );
}

