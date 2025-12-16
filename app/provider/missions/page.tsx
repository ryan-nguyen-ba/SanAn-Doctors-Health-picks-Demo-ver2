"use client";

import { ProviderLayout } from "@/components/shared/ProviderLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function MissionsPage() {
  const mockMissions = [
    { id: 1, name: "朝食を食べる", type: "デイリー", points: 10 },
    { id: 2, name: "10分間瞑想する", type: "デイリー", points: 15 },
    { id: 3, name: "野菜を3種類食べる", type: "ウィークリー", points: 30 },
  ];

  return (
    <ProviderLayout user={{ name: "プロバイダー" }}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-black">ミッション管理</h1>
          <Button style={{ background: 'linear-gradient(135deg, #FFD700, #FFA500)', color: 'white' }}>
            新規ミッション作成
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockMissions.map((mission) => (
            <Card key={mission.id} className="bg-white shadow-md border-2 border-gray-100 hover:shadow-xl hover:border-yellow-200 transition-all">
              <CardHeader>
                <CardTitle className="font-black text-black">{mission.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-medium text-black">タイプ: {mission.type}</p>
                <p className="text-sm font-medium text-black">ポイント: {mission.points}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ProviderLayout>
  );
}

