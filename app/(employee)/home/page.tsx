import { EmployeeLayout } from "@/components/shared/EmployeeLayout";
import { NotificationCard } from "@/components/employee/NotificationCard";
import { ChallengeSection } from "@/components/employee/ChallengeSection";
import { SupplementWidget } from "@/components/employee/SupplementWidget";
import { BadgesWidget } from "@/components/employee/BadgesWidget";
import { RankingWidget } from "@/components/employee/RankingWidget";
import { SupplementTimer } from "@/components/employee/SupplementTimer";
import { SurveyDueNotification } from "@/components/employee/SurveyDueNotification";
import { getSession } from "@/lib/auth/session";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getSession();

  // Mock data - will be replaced with API calls
  const notifications = [
    {
      type: "announcement" as const,
      count: 1,
      title: "お知らせ",
      content: ["初回ご利用キャンペーンのお知らせが届きました。"],
    },
    {
      type: "chat" as const,
      count: 2,
      title: "チャット",
      content: [
        "チャットが届きました。",
        "パーソナルアドバイスが届きました。",
      ],
    },
    {
      type: "alert" as const,
      count: 3,
      title: "ミッション",
      content: [
        "そるそるミッション時間です。",
        "睡眠の質改善です。",
      ],
    },
    {
      type: "delivery" as const,
      count: 2,
      title: "配送",
      content: [
        "商品が発送されました。",
        "商品が届きました。",
      ],
    },
    {
      type: "payment" as const,
      count: 1,
      title: "お支払い",
      content: ["課金が完了しました。"],
    },
  ];

  const challenges = [
    {
      title: "睡眠の質改善チャレンジ",
      level: 4,
      stars: 4,
      achievementRate: 62,
      completedMissions: 19,
      totalMissions: 30,
      daysRemaining: 4,
      recipes: [
        {
          id: "1",
          title: "夜を取り戻す、スマホ断ちレシピ",
          description: "ブルーライトが睡眠の質を下げる原因。就寝2時間前からスマホを手放して、自然な睡眠リズムを取り戻そう。",
          imageUrl: "/api/placeholder/400/300",
          isCompleted: false,
        },
        {
          id: "2",
          title: "寝る2時間前スマホOFF習慣",
          description: "今夜、寝る30分前からスマホやPC、テレビなどの画面を見るのをやめてみよう。",
          imageUrl: "/api/placeholder/400/300",
          isCompleted: true,
        },
      ],
    },
    {
      title: "睡眠の質改善チャレンジ",
      level: 4,
      stars: 4,
      achievementRate: 76,
      completedMissions: 26,
      totalMissions: 30,
      daysRemaining: 4,
      recipes: [
        {
          id: "3",
          title: "疲れ知らずのカラダをつくるレシピ",
          description: "毎日、同じでも疲れ知らずでいない。日中に集中できない時など、に生じること。",
          imageUrl: "/api/placeholder/400/300",
          isCompleted: false,
        },
        {
          id: "4",
          title: "病気に負けない「腸活」",
          description: "腸内環境を整えて、免疫力を高めるレシピ。",
          imageUrl: "/api/placeholder/400/300",
          isCompleted: false,
        },
      ],
    },
  ];

  const recommendedSupplement = {
    id: "1",
    name: "マグネシウムα",
    productCode: "00000000",
  };

  const badges = [
    {
      id: "1",
      name: "サプリコンプリート",
      earnedAt: "2023-08-01",
    },
    {
      id: "2",
      name: "S&Sミッション達成",
      earnedAt: "2023-08-01",
    },
    {
      id: "3",
      name: "30日連続ログイン",
      earnedAt: "2023-08-01",
    },
  ];

  const rankingData = {
    rank: 23,
    total: 264,
    weeklyData: [
      { day: "月", percentage: 80 },
      { day: "火", percentage: 90 },
      { day: "水", percentage: 75 },
      { day: "木", percentage: 85 },
      { day: "金", percentage: 95 },
      { day: "土", percentage: 70 },
      { day: "日", percentage: 65 },
    ],
  };

  const supplementSchedules = [
    {
      id: "1",
      supplementName: "GABAα",
      time: "22時40分",
      isDaily: true,
    },
    {
      id: "2",
      supplementName: "マグネシウムα",
      time: "22時40分",
      isDaily: true,
    },
  ];

  return (
    <EmployeeLayout
      user={{
        name: session?.user?.name || "加藤佳子",
        employeeId: "100128",
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="mb-8 bg-white rounded-2xl p-6 md:p-8 shadow-soft border border-gray-100">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            {/* Logo */}
            <div className="text-center md:text-left flex-shrink-0">
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2">
                Health Picks
              </h1>
            </div>
            
            {/* Family Image */}
            <div className="flex-1 flex justify-center md:justify-end">
              <div className="w-full max-w-md h-64 bg-gradient-to-br from-blue-100 via-blue-50 to-cyan-100 rounded-xl relative overflow-hidden flex items-center justify-center border-2 border-blue-200/50">
                {/* Placeholder for family image */}
                <div className="text-center p-8">
                  <div className="w-32 h-32 mx-auto mb-4 bg-white/80 rounded-full flex items-center justify-center border-4 border-blue-300">
                    <span className="text-4xl">👨‍👩‍👦‍👦</span>
                  </div>
                  <p className="text-blue-700 font-medium text-sm">家族のイラスト</p>
                </div>
              </div>
            </div>
            
            {/* Tagline */}
            <div className="text-center md:text-right flex-shrink-0">
              <p className="text-xl md:text-2xl font-bold text-gray-900">
                カラダに習慣<br />レシピで改善
              </p>
            </div>
          </div>
        </div>

        {/* Survey Due Notification */}
        <SurveyDueNotification />

        {/* Notifications */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-10">
          {notifications.map((notification, index) => (
            <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <NotificationCard {...notification} />
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Challenges */}
          <div className="lg:col-span-2 space-y-6">
            {challenges.map((challenge, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">選択したチャレンジ</h2>
                  <Link href="/challenges" className="text-sm text-primary hover:text-primary-dark font-medium">
                    他のチャレンジを見る →
                  </Link>
                </div>
                <ChallengeSection {...challenge} />
              </div>
            ))}
          </div>

          {/* Right Column - Widgets */}
          <div className="space-y-6">
            <div className="animate-slide-up">
              <SupplementWidget supplement={recommendedSupplement} />
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <BadgesWidget badges={badges} />
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <RankingWidget {...rankingData} />
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <SupplementTimer schedules={supplementSchedules} />
            </div>
          </div>
        </div>
      </div>
    </EmployeeLayout>
  );
}

