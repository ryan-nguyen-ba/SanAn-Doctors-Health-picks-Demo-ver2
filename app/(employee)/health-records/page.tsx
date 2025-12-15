"use client";

import { useState } from "react";
import { EmployeeLayout } from "@/components/shared/EmployeeLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertCircle, Stethoscope } from "lucide-react";

export default function HealthRecordsPage() {
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [description, setDescription] = useState("");

  const symptomOptions = [
    "頭痛",
    "めまい",
    "吐き気",
    "下痢",
    "発疹",
    "かゆみ",
    "倦怠感",
    "その他",
  ];

  const toggleSymptom = (symptom: string) => {
    if (symptoms.includes(symptom)) {
      setSymptoms(symptoms.filter((s) => s !== symptom));
    } else {
      setSymptoms([...symptoms, symptom]);
    }
  };

  return (
    <EmployeeLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">副作用・体調記録</h1>
          <p className="text-gray-600">
            体調の変化や副作用があれば記録してください
          </p>
        </div>

        <Card className="mb-6 shadow-medium border-2 border-accent/10">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-accent/10 rounded-lg">
                <AlertCircle className="w-5 h-5 text-accent" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-900">副作用記録</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-0 space-y-5">
            <div>
              <label className="block text-sm font-bold mb-4 text-gray-900">
                症状（複数選択可）
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {symptomOptions.map((symptom) => (
                  <div 
                    key={symptom} 
                    className={`flex items-center space-x-2 p-3 rounded-xl border-2 transition-all cursor-pointer ${
                      symptoms.includes(symptom)
                        ? "border-primary bg-primary-light/20"
                        : "border-gray-200 bg-white hover:border-primary/30"
                    }`}
                    onClick={() => toggleSymptom(symptom)}
                  >
                    <Checkbox
                      id={symptom}
                      checked={symptoms.includes(symptom)}
                      onCheckedChange={() => toggleSymptom(symptom)}
                      className="w-5 h-5"
                    />
                    <label
                      htmlFor={symptom}
                      className="text-sm font-medium cursor-pointer text-gray-900"
                    >
                      {symptom}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold mb-3 text-gray-900">
                詳細（自由入力）
              </label>
              <textarea
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                rows={6}
                placeholder="症状の詳細、発生時期、程度などを記入してください"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
              <Button className="font-semibold shadow-sm flex-1">記録を保存</Button>
              <Button variant="outline" className="flex items-center justify-center space-x-2 font-semibold shadow-sm flex-1">
                <Stethoscope className="w-4 h-4" />
                <span>医師に相談する</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-medium">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold text-gray-900">記録履歴</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-4">
              <div className="p-5 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:shadow-soft transition-all">
                <div className="flex justify-between items-start mb-3">
                  <p className="font-bold text-gray-900">2023年9月28日</p>
                  <span className="text-xs text-gray-500 font-medium">1週間前</span>
                </div>
                <p className="text-sm text-gray-700 mb-2 font-semibold">症状: <span className="text-primary">頭痛、めまい</span></p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  軽い頭痛とめまいがありました。サプリメントを服用してから1時間後に発生。
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </EmployeeLayout>
  );
}

