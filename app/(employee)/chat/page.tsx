"use client";

import { useState } from "react";
import { EmployeeLayout } from "@/components/shared/EmployeeLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, Send } from "lucide-react";

interface Message {
  id: string;
  text: string;
  isFromDoctor: boolean;
  doctorName?: string;
  timestamp: Date;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "こんにちは。体調はいかがですか？",
      isFromDoctor: true,
      doctorName: "田中医師",
      timestamp: new Date("2023-09-28T10:00:00"),
    },
    {
      id: "2",
      text: "おかげさまで、睡眠の質が改善してきました。",
      isFromDoctor: false,
      timestamp: new Date("2023-09-28T10:05:00"),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: Date.now().toString(),
          text: newMessage,
          isFromDoctor: false,
          timestamp: new Date(),
        },
      ]);
      setNewMessage("");
    }
  };

  return (
    <EmployeeLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2 flex items-center space-x-2">
            <MessageSquare className="w-8 h-8" />
            <span>チャット</span>
          </h1>
          <p className="text-gray-600">医療従事者とのチャット</p>
        </div>

        <Card className="h-[600px] flex flex-col shadow-large">
          <CardContent className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-gray-50 to-white">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.isFromDoctor ? "justify-start" : "justify-end"
                } animate-slide-up`}
              >
                <div
                  className={`max-w-[70%] rounded-2xl p-4 shadow-soft ${
                    message.isFromDoctor
                      ? "bg-white text-gray-900 border border-gray-200"
                      : "bg-gradient-to-r from-primary to-primary-dark text-white shadow-medium"
                  }`}
                >
                  {message.isFromDoctor && message.doctorName && (
                    <p className="text-xs font-bold mb-2 text-primary">
                      {message.doctorName}
                    </p>
                  )}
                  <p className="leading-relaxed">{message.text}</p>
                  <p className={`text-xs mt-2 ${message.isFromDoctor ? "text-gray-500" : "opacity-80"}`}>
                    {message.timestamp.toLocaleTimeString("ja-JP", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
          <div className="p-4 border-t border-gray-200 bg-white flex space-x-3">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="メッセージを入力..."
              className="flex-1 rounded-xl border-2 focus:border-primary"
            />
            <Button onClick={handleSend} className="rounded-xl shadow-sm">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      </div>
    </EmployeeLayout>
  );
}

