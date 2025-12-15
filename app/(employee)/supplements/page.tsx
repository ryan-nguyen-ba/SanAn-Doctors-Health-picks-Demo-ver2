"use client";

import { useState } from "react";
import { EmployeeLayout } from "@/components/shared/EmployeeLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Pill, Clock, Calendar, ShoppingCart, Stethoscope, Award } from "lucide-react";

export default function SupplementsPage() {
  const [purchased, setPurchased] = useState(false);
  const [schedule, setSchedule] = useState({ time: "22:00", channels: ["email"] });

  const supplement = {
    id: "1",
    name: "マグネシウムα",
    description: "睡眠の質向上に効果的なマグネシウムサプリメント",
    efficacy: "睡眠の質向上、筋肉のリラックス、ストレス軽減",
    sideEffects: "まれに下痢を起こすことがあります",
    productCode: "00000000",
    purchaseUrl: "#",
    remaining: 30,
  };

  const intakeRecords = [
    { date: "2023/09/28", time: "22:00", completed: true },
    { date: "2023/09/27", time: "22:00", completed: true },
    { date: "2023/09/26", time: "22:00", completed: false },
  ];

  const streaks = {
    current: 5,
    longest: 30,
    milestones: ["1W", "1M", "3M", "6M", "1Y"],
  };

  return (
    <EmployeeLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">マイサプリ</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-medium border-2 border-primary/10">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary-light rounded-lg">
                    <Pill className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">{supplement.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-0 space-y-5">
                <div>
                  <p className="text-sm text-gray-600 mb-2">{supplement.description}</p>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="purchased"
                    checked={purchased}
                    onCheckedChange={(checked) => setPurchased(checked as boolean)}
                  />
                  <label htmlFor="purchased" className="text-sm font-medium">
                    購入済み / 既に服用中
                  </label>
                </div>

                {purchased && (
                  <>
                    <div className="p-4 bg-green-50 border-2 border-green-200 rounded-xl mb-4">
                      <p className="text-sm font-bold text-green-800 mb-1">✓ 購入確認済み</p>
                      <p className="text-xs text-green-700">アドヒアランス（服用継続）の追跡を開始しました</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">効能</h3>
                      <p className="text-sm text-gray-700">{supplement.efficacy}</p>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">副作用</h3>
                      <p className="text-sm text-gray-700">{supplement.sideEffects}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600 mb-2">残量</p>
                      <p className="text-lg font-bold">{supplement.remaining}錠</p>
                    </div>

                    {/* Adherence Tracking Schedule Setup */}
                    <div className="mt-4 p-4 bg-primary-light/10 rounded-xl border border-primary/20">
                      <h3 className="font-semibold mb-3 text-gray-900">服用スケジュール設定</h3>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium mb-2">服用時間</label>
                          <Input
                            type="time"
                            value={schedule.time}
                            onChange={(e) => setSchedule({ ...schedule, time: e.target.value })}
                            className="w-full"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">通知チャネル</label>
                          <div className="space-y-2">
                            <label className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                checked={schedule.channels.includes("email")}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSchedule({ ...schedule, channels: [...schedule.channels, "email"] });
                                  } else {
                                    setSchedule({ ...schedule, channels: schedule.channels.filter((c) => c !== "email") });
                                  }
                                }}
                                className="w-4 h-4"
                              />
                              <span className="text-sm">メール</span>
                            </label>
                            <label className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                checked={schedule.channels.includes("line")}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSchedule({ ...schedule, channels: [...schedule.channels, "line"] });
                                  } else {
                                    setSchedule({ ...schedule, channels: schedule.channels.filter((c) => c !== "line") });
                                  }
                                }}
                                className="w-4 h-4"
                              />
                              <span className="text-sm">LINE</span>
                            </label>
                          </div>
                        </div>
                        <Button className="w-full font-semibold shadow-sm">
                          スケジュールを保存
                        </Button>
                      </div>
                    </div>
                  </>
                )}

                <div className="flex space-x-3">
                  <Button variant="outline" className="flex-1 font-semibold shadow-sm">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    購入する
                  </Button>
                  <Button variant="outline" className="flex-1 font-semibold shadow-sm">
                    <Stethoscope className="w-4 h-4 mr-2" />
                    オンライン診断
                  </Button>
                </div>
              </CardContent>
            </Card>

            {purchased && (
              <>
                <Card className="shadow-medium">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center space-x-2 text-xl font-bold text-gray-900">
                      <div className="p-2 bg-primary-light rounded-lg">
                        <Clock className="w-5 h-5 text-primary" />
                      </div>
                      <span>服用管理</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-5">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        服用時間設定
                      </label>
                      <Input
                        type="time"
                        value={schedule.time}
                        onChange={(e) =>
                          setSchedule({ ...schedule, time: e.target.value })
                        }
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        通知チャネル
                      </label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="email"
                            checked={schedule.channels.includes("email")}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSchedule({
                                  ...schedule,
                                  channels: [...schedule.channels, "email"],
                                });
                              } else {
                                setSchedule({
                                  ...schedule,
                                  channels: schedule.channels.filter((c) => c !== "email"),
                                });
                              }
                            }}
                          />
                          <label htmlFor="email" className="text-sm">
                            メール
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="line"
                            checked={schedule.channels.includes("line")}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSchedule({
                                  ...schedule,
                                  channels: [...schedule.channels, "line"],
                                });
                              } else {
                                setSchedule({
                                  ...schedule,
                                  channels: schedule.channels.filter((c) => c !== "line"),
                                });
                              }
                            }}
                          />
                          <label htmlFor="line" className="text-sm">
                            LINE
                          </label>
                        </div>
                      </div>
                    </div>

                    <Button className="font-semibold shadow-sm">設定を保存</Button>
                  </CardContent>
                </Card>

                <Card className="shadow-medium">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center space-x-2 text-xl font-bold text-gray-900">
                      <div className="p-2 bg-primary-light rounded-lg">
                        <Calendar className="w-5 h-5 text-primary" />
                      </div>
                      <span>服用記録</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      {intakeRecords.map((record, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:shadow-soft transition-all"
                        >
                          <div>
                            <p className="font-bold text-gray-900">{record.date}</p>
                            <p className="text-sm text-gray-600 mt-0.5">{record.time}</p>
                          </div>
                          <Badge
                            variant={record.completed ? "default" : "secondary"}
                            className="shadow-sm"
                          >
                            {record.completed ? "服用済み" : "未服用"}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {purchased && (
              <Card className="shadow-medium bg-gradient-to-br from-primary-light/20 to-white border-primary/20">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-2 text-xl font-bold text-gray-900">
                    <div className="p-2 bg-primary rounded-lg">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <span>連続服用記録</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-center mb-5 p-4 bg-white rounded-xl border border-primary/10">
                    <p className="text-5xl font-bold text-primary mb-2">{streaks.current}日</p>
                    <p className="text-sm text-gray-600 font-medium">現在の連続記録</p>
                  </div>
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600 font-medium">最長記録: <span className="font-bold text-primary">{streaks.longest}日</span></p>
                    <div className="flex flex-wrap gap-2">
                      {streaks.milestones.map((milestone) => (
                        <Badge key={milestone} variant="outline" className="font-medium">
                          {milestone}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </EmployeeLayout>
  );
}

