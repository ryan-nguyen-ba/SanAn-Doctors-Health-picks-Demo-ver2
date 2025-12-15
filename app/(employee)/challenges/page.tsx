import { EmployeeLayout } from "@/components/shared/EmployeeLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Link from "next/link";

interface Challenge {
  id: string;
  title: string;
  description: string;
  level: string;
  stars: number;
  priority: number;
  tags: string[];
}

export default async function ChallengesPage() {
  // Mock data - will be replaced with API call
  const challenges: Challenge[] = [
    {
      id: "1",
      title: "睡眠の質改善チャレンジ",
      description:
        "良質な睡眠を取るための習慣を身につけ、睡眠の質を向上させるチャレンジです。",
      level: "INTERMEDIATE",
      stars: 4,
      priority: 1,
      tags: ["推奨", "睡眠"],
    },
    {
      id: "2",
      title: "疲労回復チャレンジ",
      description:
        "日々の疲労を効果的に回復し、エネルギーレベルを向上させるチャレンジです。",
      level: "BEGINNER",
      stars: 3,
      priority: 2,
      tags: ["疲労", "健康"],
    },
    {
      id: "3",
      title: "ストレス管理チャレンジ",
      description:
        "ストレスを効果的に管理し、メンタルヘルスを改善するチャレンジです。",
      level: "ADVANCED",
      stars: 5,
      priority: 1,
      tags: ["推奨", "ストレス"],
    },
    {
      id: "4",
      title: "栄養バランス改善チャレンジ",
      description:
        "食事の栄養バランスを改善し、健康的な食生活を実現するチャレンジです。",
      level: "BEGINNER",
      stars: 2,
      priority: 3,
      tags: ["食事", "栄養"],
    },
  ];

  const getLevelLabel = (level: string) => {
    switch (level) {
      case "BEGINNER":
        return "初級";
      case "INTERMEDIATE":
        return "中級";
      case "ADVANCED":
        return "上級";
      default:
        return level;
    }
  };

  const getPriorityColor = (priority: number) => {
    if (priority === 1) return "destructive";
    if (priority === 2) return "default";
    return "secondary";
  };

  return (
    <EmployeeLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">チャレンジ一覧</h1>
          <p className="text-gray-600">
            あなたに合ったチャレンジを選択して、健康習慣を身につけましょう
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map((challenge, index) => (
            <Card 
              key={challenge.id} 
              className="card-hover border-2 border-transparent hover:border-primary/20 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between mb-3 gap-2">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-xl font-bold mb-2 text-gray-900 line-clamp-2">
                      {challenge.title}
                    </CardTitle>
                    <div className="flex items-center space-x-2 mb-3 flex-wrap gap-2">
                      <Badge variant="outline" className="text-xs font-medium">
                        {getLevelLabel(challenge.level)}
                      </Badge>
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < challenge.stars
                                ? "fill-primary text-primary drop-shadow-sm"
                                : "text-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  {challenge.priority <= 2 && (
                    <Badge 
                      variant={getPriorityColor(challenge.priority) as any}
                      className="flex-shrink-0 shadow-sm"
                    >
                      {challenge.priority === 1 ? "高優先度" : "推奨"}
                    </Badge>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {challenge.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs font-medium">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-gray-600 mb-5 leading-relaxed line-clamp-3">
                  {challenge.description}
                </p>
                <Link href={`/challenges/${challenge.id}`}>
                  <Button className="w-full font-semibold">詳細を見る</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </EmployeeLayout>
  );
}

