"use client";

import { useState } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, getDay } from "date-fns";
import { ja } from "date-fns/locale";

interface CalendarWidgetProps {
  markedDates?: Date[];
}

export function CalendarWidget({ markedDates = [] }: CalendarWidgetProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  const weekDays = ["日", "月", "火", "水", "木", "金", "土"];
  const firstDayOfWeek = getDay(monthStart);

  // Fill empty cells at the start
  const emptyCells = Array(firstDayOfWeek).fill(null);

  const isMarked = (date: Date) => {
    return markedDates.some(marked => isSameDay(marked, date));
  };

  return (
    <div className="w-full">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
          className="p-1 hover:bg-gray-100 rounded"
        >
          ←
        </button>
        <h3 className="text-sm font-bold text-gray-900">
          {format(currentDate, "yyyy年M月", { locale: ja })}
        </h3>
        <button
          onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
          className="p-1 hover:bg-gray-100 rounded"
        >
          →
        </button>
      </div>

      {/* Week Days Header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-xs font-semibold text-gray-600 text-center py-1"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-1">
        {emptyCells.map((_, index) => (
          <div key={`empty-${index}`} className="aspect-square" />
        ))}
        {daysInMonth.map((day) => {
          const isToday = isSameDay(day, new Date());
          const marked = isMarked(day);
          
          return (
            <div
              key={day.toISOString()}
              className={`aspect-square flex items-center justify-center text-xs rounded ${
                isToday
                  ? "bg-primary text-white font-bold"
                  : marked
                  ? "bg-primary-light text-primary font-semibold"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              {format(day, "d")}
            </div>
          );
        })}
      </div>
    </div>
  );
}

