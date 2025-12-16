"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, X } from "lucide-react";
import Link from "next/link";

export function SurveyDueNotification() {
  const [isDue, setIsDue] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if survey is due
    const nextSurveyDueAt = localStorage.getItem("nextSurveyDueAt");
    const hasCompletedFirstSurvey = localStorage.getItem("hasCompletedFirstSurvey");

    if (hasCompletedFirstSurvey && nextSurveyDueAt) {
      const dueDate = new Date(nextSurveyDueAt);
      const now = new Date();
      if (now >= dueDate) {
        setIsDue(true);
      }
    } else if (!hasCompletedFirstSurvey) {
      // First survey not completed
      setIsDue(true);
    }

    // Check if dismissed
    const dismissed = localStorage.getItem("surveyNotificationDismissed");
    if (dismissed === "true") {
      setIsDismissed(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem("surveyNotificationDismissed", "true");
  };

  if (!isDue || isDismissed) {
    return null;
  }

  return (
    <Card className="mb-6 shadow-sm border border-yellow-200 bg-yellow-50">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            <div className="p-2 rounded-lg flex-shrink-0" style={{ backgroundColor: '#FFD700' }}>
              <AlertCircle className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 mb-1">アンケートのお願い</h3>
              <p className="text-sm text-gray-700 mb-3">
                健康状態を把握し、最適なチャレンジをご提案するために、アンケートへのご回答をお願いいたします。
              </p>
              <Link href="/questionnaire">
                <Button size="sm" className="font-semibold text-white" style={{ backgroundColor: '#FFD700' }}>
                  アンケートに回答する
                </Button>
              </Link>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="p-1 hover:bg-gray-100 rounded flex-shrink-0 ml-2"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

