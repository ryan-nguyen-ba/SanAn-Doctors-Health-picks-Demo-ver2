"use client";

import { useState, useEffect } from "react";
import { EmployeeLayout } from "@/components/shared/EmployeeLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, X } from "lucide-react";

interface QuestionnaireData {
  sleep: {
    quality: number;
    duration: number;
    difficulty: string;
  };
  fatigue: {
    level: number;
    frequency: string;
    impact: string;
  };
  stress: {
    level: number;
    sources: string[];
    management: string;
  };
  diet: {
    regularity: string;
    balance: number;
    concerns: string[];
  };
}

const sleepQuestions = [
  { id: "quality", label: "睡眠の質", type: "slider" as const },
  { id: "duration", label: "睡眠時間", type: "slider" as const },
  {
    id: "difficulty",
    label: "入眠の困難さ",
    type: "radio" as const,
    options: [
      { value: "none", label: "問題なし" },
      { value: "mild", label: "軽度" },
      { value: "moderate", label: "中度" },
      { value: "severe", label: "重度" },
    ],
  },
];

const fatigueQuestions = [
  { id: "level", label: "疲労レベル", type: "slider" as const },
  {
    id: "frequency",
    label: "疲労の頻度",
    type: "radio" as const,
    options: [
      { value: "rarely", label: "ほとんどない" },
      { value: "sometimes", label: "時々" },
      { value: "often", label: "よくある" },
      { value: "always", label: "常にある" },
    ],
  },
  {
    id: "impact",
    label: "日常生活への影響",
    type: "radio" as const,
    options: [
      { value: "none", label: "影響なし" },
      { value: "mild", label: "軽度" },
      { value: "moderate", label: "中度" },
      { value: "severe", label: "重度" },
    ],
  },
];

const stressQuestions = [
  { id: "level", label: "ストレスレベル", type: "slider" as const },
  {
    id: "sources",
    label: "ストレスの原因（複数選択可）",
    type: "checkbox" as const,
    options: [
      { value: "work", label: "仕事" },
      { value: "family", label: "家族" },
      { value: "health", label: "健康" },
      { value: "finance", label: "経済" },
      { value: "other", label: "その他" },
    ],
  },
  {
    id: "management",
    label: "ストレス管理方法",
    type: "radio" as const,
    options: [
      { value: "exercise", label: "運動" },
      { value: "hobby", label: "趣味" },
      { value: "rest", label: "休息" },
      { value: "none", label: "特にない" },
    ],
  },
];

const dietQuestions = [
  {
    id: "regularity",
    label: "食事の規則性",
    type: "radio" as const,
    options: [
      { value: "regular", label: "規則的" },
      { value: "irregular", label: "不規則" },
      { value: "very-irregular", label: "非常に不規則" },
    ],
  },
  { id: "balance", label: "栄養バランス", type: "slider" as const },
  {
    id: "concerns",
    label: "食事に関する懸念（複数選択可）",
    type: "checkbox" as const,
    options: [
      { value: "nutrition", label: "栄養不足" },
      { value: "weight", label: "体重管理" },
      { value: "digestion", label: "消化" },
      { value: "allergy", label: "アレルギー" },
      { value: "other", label: "その他" },
    ],
  },
];

export default function QuestionnairePage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<Partial<QuestionnaireData>>({});
  const [showMandatoryModal, setShowMandatoryModal] = useState(false);

  useEffect(() => {
    // Check if first survey is completed
    const hasCompletedFirstSurvey = localStorage.getItem("hasCompletedFirstSurvey");
    if (!hasCompletedFirstSurvey) {
      setShowMandatoryModal(true);
    }
  }, []);

  const steps = [
    { id: "sleep", title: "睡眠", questions: sleepQuestions },
    { id: "fatigue", title: "疲労", questions: fatigueQuestions },
    { id: "stress", title: "ストレス", questions: stressQuestions },
    { id: "diet", title: "食生活", questions: dietQuestions },
  ];

  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    // Submit questionnaire data
    console.log("Questionnaire data:", data);
    // Mark first survey as completed
    localStorage.setItem("hasCompletedFirstSurvey", "true");
    // Set next survey due date (30 days from now)
    const nextSurveyDate = new Date();
    nextSurveyDate.setDate(nextSurveyDate.getDate() + 30);
    localStorage.setItem("nextSurveyDueAt", nextSurveyDate.toISOString());
    // Redirect to challenges with recommendations
    window.location.href = "/challenges";
  };

  const updateData = (field: string, value: any) => {
    setData((prev) => ({
      ...prev,
      [currentStepData.id]: {
        ...(prev[currentStepData.id as keyof QuestionnaireData] as any),
        [field]: value,
      },
    }));
  };

  return (
    <EmployeeLayout>
      {/* Mandatory Survey Modal */}
      {showMandatoryModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="max-w-md w-full shadow-large border-2 border-primary/20">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary-light rounded-lg">
                    <AlertCircle className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    初回アンケート必須
                  </CardTitle>
                </div>
                <button
                  onClick={() => setShowMandatoryModal(false)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-gray-700 mb-4">
                初回利用時は、アンケートへの回答が必須です。健康状態を把握し、最適なチャレンジをご提案するためにご協力をお願いいたします。
              </p>
              <Button
                onClick={() => setShowMandatoryModal(false)}
                className="w-full font-semibold shadow-sm"
              >
                アンケートを開始する
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        <Card className="shadow-large border-2 border-primary/10">
          <CardHeader className="pb-4">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-gray-700">
                  ステップ {currentStep + 1} / {steps.length}
                </p>
                <span className="text-sm font-bold text-primary">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-3" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              {currentStepData.title}に関する質問
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {currentStepData.questions.map((question) => (
              <div key={question.id}>
                <label className="block text-sm font-medium mb-2">
                  {question.label}
                </label>
                {question.type === "slider" && (
                  <div className="space-y-2">
                    <Slider
                      value={
                        (data[currentStepData.id as keyof QuestionnaireData] as any)?.[
                          question.id
                        ] || 50
                      }
                      onValueChange={(value) => updateData(question.id, value)}
                      min={0}
                      max={100}
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>低い</span>
                      <span>高い</span>
                    </div>
                    <p className="text-center text-sm font-semibold">
                      {
                        (data[currentStepData.id as keyof QuestionnaireData] as any)?.[
                          question.id
                        ] || 50
                      }
                    </p>
                  </div>
                )}
                {question.type === "radio" && (
                  <RadioGroup
                    value={
                      (data[currentStepData.id as keyof QuestionnaireData] as any)?.[
                        question.id
                      ] || ""
                    }
                    onValueChange={(value) => updateData(question.id, value)}
                  >
                    {question.options?.map((option) => (
                      <RadioItem
                        key={option.value}
                        value={option.value}
                        label={option.label}
                      />
                    ))}
                  </RadioGroup>
                )}
                {question.type === "checkbox" && (
                  <div className="space-y-2">
                    {question.options?.map((option) => (
                      <label
                        key={option.value}
                        className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:border-primary"
                      >
                        <input
                          type="checkbox"
                          value={option.value}
                          checked={
                            (
                              (data[
                                currentStepData.id as keyof QuestionnaireData
                              ] as any)?.[question.id] || []
                            ).includes(option.value)
                          }
                          onChange={(e) => {
                            const current = (
                              (data[
                                currentStepData.id as keyof QuestionnaireData
                              ] as any)?.[question.id] || []
                            ) as string[];
                            const newValue = e.target.checked
                              ? [...current, option.value]
                              : current.filter((v) => v !== option.value);
                            updateData(question.id, newValue);
                          }}
                          className="w-4 h-4 text-primary"
                        />
                        <span>{option.label}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="flex justify-between pt-6 border-t border-gray-100">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 0}
                className="min-w-[120px]"
              >
                戻る
              </Button>
              <Button onClick={handleNext} className="min-w-[120px] font-semibold">
                {currentStep === steps.length - 1 ? "完了" : "次へ →"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </EmployeeLayout>
  );
}

