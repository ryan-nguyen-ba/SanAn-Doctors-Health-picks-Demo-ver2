"use client";

import { useState } from "react";
import { EmployeeLayout } from "@/components/shared/EmployeeLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    name: "加藤佳子",
    nameKana: "かとうよしこ",
    age: 35,
    gender: "女性",
    bmi: 22.5,
  });

  const [vitals, setVitals] = useState({
    temperature: 36.5,
    weight: 65,
    sleep: 7,
    mood: "良好",
  });

  const [notifications, setNotifications] = useState({
    email: true,
    line: false,
    push: true,
  });

  return (
    <EmployeeLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">設定・マイページ</h1>
        </div>

        <Card className="mb-6 bg-white shadow-sm border border-gray-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold text-gray-900">プロフィール編集</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-5">
            <div>
              <label className="block text-sm font-bold mb-2 text-gray-900">名前</label>
              <Input
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="bg-white border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2 text-gray-900">名前（カナ）</label>
              <Input
                value={profile.nameKana}
                onChange={(e) =>
                  setProfile({ ...profile, nameKana: e.target.value })
                }
                className="bg-white border border-gray-300 rounded-lg"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold mb-2 text-gray-900">年齢</label>
                <Input
                  type="number"
                  value={profile.age}
                  onChange={(e) =>
                    setProfile({ ...profile, age: parseInt(e.target.value) })
                  }
                  className="bg-white border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2 text-gray-900">性別</label>
                <Input
                  value={profile.gender}
                  onChange={(e) =>
                    setProfile({ ...profile, gender: e.target.value })
                  }
                  className="bg-white border border-gray-300 rounded-lg"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold mb-2 text-gray-900">BMI</label>
              <Input
                type="number"
                step="0.1"
                value={profile.bmi}
                onChange={(e) =>
                  setProfile({ ...profile, bmi: parseFloat(e.target.value) })
                }
                className="bg-white border border-gray-300 rounded-lg"
              />
            </div>
            <Button className="font-semibold shadow-sm">保存</Button>
          </CardContent>
        </Card>

        <Card className="mb-6 bg-white shadow-sm border border-gray-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold text-gray-900">基本バイタル登録</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-5">
            <div>
              <label className="block text-sm font-bold mb-2 text-gray-900">体温</label>
              <Input
                type="number"
                step="0.1"
                value={vitals.temperature}
                onChange={(e) =>
                  setVitals({ ...vitals, temperature: parseFloat(e.target.value) })
                }
                className="bg-white border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2 text-gray-900">体重</label>
              <Input
                type="number"
                step="0.1"
                value={vitals.weight}
                onChange={(e) =>
                  setVitals({ ...vitals, weight: parseFloat(e.target.value) })
                }
                className="bg-white border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2 text-gray-900">睡眠時間</label>
              <Input
                type="number"
                value={vitals.sleep}
                onChange={(e) =>
                  setVitals({ ...vitals, sleep: parseInt(e.target.value) })
                }
                className="bg-white border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2 text-gray-900">気分</label>
              <Input
                value={vitals.mood}
                onChange={(e) => setVitals({ ...vitals, mood: e.target.value })}
                className="bg-white border border-gray-300 rounded-lg"
              />
            </div>
            <Button className="font-semibold shadow-sm">保存</Button>
          </CardContent>
        </Card>

        <Card className="mb-6 bg-white shadow-sm border border-gray-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold text-gray-900">チャレンジ履歴</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              <div className="p-4 bg-gradient-to-r from-primary-light/30 to-white rounded-xl border border-primary/10 hover:shadow-soft transition-all">
                <p className="font-bold text-gray-900 mb-1">睡眠の質改善チャレンジ</p>
                <p className="text-sm text-gray-600">2023年9月 - 進行中</p>
              </div>
              <div className="p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:shadow-soft transition-all">
                <p className="font-bold text-gray-900 mb-1">疲労回復チャレンジ</p>
                <p className="text-sm text-gray-600">2023年8月 - 完了</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border border-gray-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold text-gray-900">通知設定</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="email"
                checked={notifications.email}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, email: checked as boolean })
                }
              />
              <label htmlFor="email" className="text-sm font-medium">
                メール通知
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="line"
                checked={notifications.line}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, line: checked as boolean })
                }
              />
              <label htmlFor="line" className="text-sm font-medium">
                LINE連携
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="push"
                checked={notifications.push}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, push: checked as boolean })
                }
              />
              <label htmlFor="push" className="text-sm font-medium">
                プッシュ通知
              </label>
            </div>
            <Button className="font-semibold shadow-sm">保存</Button>
          </CardContent>
        </Card>
      </div>
    </EmployeeLayout>
  );
}

