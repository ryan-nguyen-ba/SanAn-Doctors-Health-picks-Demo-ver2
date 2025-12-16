import { EmployeeLayout } from "@/components/shared/EmployeeLayout";
import { NotificationCard } from "@/components/employee/NotificationCard";
import { ChallengeSection } from "@/components/employee/ChallengeSection";
import { SupplementWidget } from "@/components/employee/SupplementWidget";
import { BadgesWidget } from "@/components/employee/BadgesWidget";
import { RankingWidget } from "@/components/employee/RankingWidget";
import { SupplementTimer } from "@/components/employee/SupplementTimer";
import { getSession } from "@/lib/auth/session";

export default async function DashboardPage() {
  const session = await getSession();

  // Mock data - will be replaced with API calls
  const notifications = [
    {
      type: "announcement" as const,
      count: 1,
      title: "お知らせ",
      content: ["キャンペーンの期間のお知らせがきました。"],
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
      title: "通知",
      content: [
        "そそるミッションの期間です。",
        "サプリタイマー 毎日のです。",
      ],
    },
    {
      type: "delivery" as const,
      count: 2,
      title: "配信",
      content: [
        "商品が発送されました。",
        "商品が発送されました。",
      ],
    },
    {
      type: "payment" as const,
      count: 1,
      title: "お支払い",
      content: ["オンライン決済が完了しました。"],
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
          title: "寝る2時間前スマホOFF習慣",
          description:
            "今夜、寝る30分前からスマホやPC、テレビなどの画面を見るのをやめてみよう。",
          isCompleted: false,
        },
        {
          id: "2",
          title: "寝る2時間前スマホOFF習慣",
          description:
            "今夜、寝る30分前からスマホやPC、テレビなどの画面を見るのをやめてみよう。",
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
          title: "慣れ知らずのカラダをつくるレシピ",
          description:
            "毎日、同じでも慣れ知らずでいない。日中に集中できない時など、に生じること。",
          isCompleted: false,
        },
        {
          id: "4",
          title: "疲労に負けない「筋肉飯」",
          description: "疲労回復に効果的な栄養素を摂取するレシピ。",
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
      name: "サプリ3種コンプリート",
      earnedAt: "2023-09-22",
    },
    {
      id: "2",
      name: "5日ミッション達成",
      earnedAt: "2023-09-22",
    },
    {
      id: "3",
      name: "30日連続ログイン",
      earnedAt: "2023-09-22",
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
      supplementName: "GABA",
      time: "22時00分",
      isDaily: true,
    },
    {
      id: "2",
      supplementName: "マグネシウム",
      time: "22時00分",
      isDaily: true,
    },
  ];

  const totalNotifications = notifications.reduce((sum, item) => sum + item.count, 0);

  return (
    <EmployeeLayout
      user={{
        name: session?.user?.name || "加藤佳子",
        employeeId: "100128",
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-br from-yellow-100 via-orange-50 to-white rounded-3xl p-6 md:p-8 border-2 border-yellow-200 shadow-md flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-xs md:text-sm font-bold uppercase tracking-wide" style={{ color: "#A0522D" }}>
                ようこそ
              </p>
              <h1
                className="text-3xl md:text-4xl font-black mt-2"
                style={{ color: "#8B4513" }}
              >
                {(session?.user?.name || "加藤佳子")}さんのホーム
              </h1>
              <p className="mt-3 text-sm md:text-base font-medium" style={{ color: "#A0522D" }}>
                今日のチャレンジ、ミッション、サプリメントの予定をここでまとめてチェックできます。
              </p>
            </div>
            <div className="flex md:flex-col gap-3 md:gap-2 min-w-[220px]">
              <div className="flex-1 px-4 py-3 rounded-2xl bg-white/80 border border-yellow-200 shadow-sm">
                <p className="text-xs font-semibold text-gray-500">参加中チャレンジ</p>
                <p className="text-2xl font-black" style={{ color: "#8B4513" }}>
                  {challenges.length}
                </p>
              </div>
              <div className="flex-1 px-4 py-3 rounded-2xl bg-white/80 border border-yellow-200 shadow-sm">
                <p className="text-xs font-semibold text-gray-500">未読のお知らせ</p>
                <p className="text-2xl font-black" style={{ color: "#8B4513" }}>
                  {totalNotifications}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {notifications.map((notification, index) => (
            <NotificationCard key={index} {...notification} />
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Challenges */}
          <div className="lg:col-span-2 space-y-6">
            {challenges.map((challenge, index) => (
              <ChallengeSection key={index} {...challenge} />
            ))}
          </div>

          {/* Right Column - Widgets */}
          <div className="space-y-6">
            <SupplementWidget supplement={recommendedSupplement} />
            <BadgesWidget badges={badges} />
            <RankingWidget {...rankingData} />
            <SupplementTimer schedules={supplementSchedules} />
          </div>
        </div>
      </div>
    </EmployeeLayout>
  );
}

