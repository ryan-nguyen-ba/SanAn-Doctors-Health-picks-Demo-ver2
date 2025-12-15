"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarWidget } from "./CalendarWidget";

interface SupplementSchedule {
  id: string;
  supplementName: string;
  time: string;
  isDaily: boolean;
}

interface SupplementTimerProps {
  schedules: SupplementSchedule[];
}

export function SupplementTimer({ schedules }: SupplementTimerProps) {
  const today = new Date();
  const dayNames = ["日", "月", "火", "水", "木", "金", "土"];

  return (
    <Card className="shadow-soft">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold text-gray-900">サプリタイマー</CardTitle>
          <Link href="/supplements/settings" className="text-sm text-primary hover:text-primary-dark font-medium transition-colors">
            設定する →
          </Link>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="mb-5 p-3 bg-primary-light/30 rounded-xl border border-primary/10">
          <div className="flex items-center space-x-2 text-sm text-gray-700 font-medium">
            <Calendar className="w-4 h-4 text-primary" />
            <span>
              本日 {format(today, "M月d日", { locale: ja })}
              {dayNames[today.getDay()]}曜日
            </span>
          </div>
        </div>
        <div className="mb-4">
          <p className="text-sm font-semibold text-gray-900 mb-3">
            毎日 {schedules[0]?.time || "22時40分"}
          </p>
          <div className="space-y-2">
            {schedules.map((schedule) => (
              <div
                key={schedule.id}
                className="flex items-center space-x-3 p-2 bg-gradient-to-r from-primary-light/20 to-white rounded-lg border border-primary/10"
              >
                <Checkbox id={schedule.id} defaultChecked={true} />
                <label htmlFor={schedule.id} className="text-sm font-medium text-gray-900 cursor-pointer flex-1">
                  {schedule.supplementName}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 p-3 bg-gray-50 rounded-xl border border-gray-200">
          <CalendarWidget 
            markedDates={[
              new Date(2023, 9, 15),
              new Date(2023, 9, 16),
              new Date(2023, 9, 17),
              new Date(2023, 9, 18),
              new Date(2023, 9, 19),
            ]}
          />
        </div>
      </CardContent>
    </Card>
  );
}

