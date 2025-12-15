import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data (optional - for clean seed)
  await prisma.userBadge.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.user.deleteMany();
  await prisma.department.deleteMany();

  // Create departments
  const dept1 = await prisma.department.create({
    data: {
      name: "営業部",
      nameKana: "えいぎょうぶ",
    },
  });

  const dept2 = await prisma.department.create({
    data: {
      name: "開発部",
      nameKana: "かいはつぶ",
    },
  });

  // Create users
  const hashedPassword = await bcrypt.hash("password123", 10);

  const employee = await prisma.user.create({
    data: {
      email: "employee@example.com",
      name: "加藤佳子",
      nameKana: "かとうよしこ",
      password: hashedPassword,
      role: "EMPLOYEE",
      employeeId: "100128",
      departmentId: dept1.id,
      age: 35,
      gender: "女性",
      bmi: 22.5,
    },
  });

  const admin = await prisma.user.create({
    data: {
      email: "admin@example.com",
      name: "管理者",
      password: hashedPassword,
      role: "ADMIN",
      employeeId: "ADMIN001",
      departmentId: dept1.id,
    },
  });

  const provider = await prisma.user.create({
    data: {
      email: "provider@example.com",
      name: "プロバイダー",
      password: hashedPassword,
      role: "PROVIDER",
      employeeId: "PROVIDER001",
    },
  });

  // Create badges
  const badge1 = await prisma.badge.create({
    data: {
      name: "サプリ3種コンプリート",
      type: "SUPPLEMENT_COMPLETE",
      icon: "⭐",
    },
  });

  const badge2 = await prisma.badge.create({
    data: {
      name: "5日ミッション達成",
      type: "MISSION_ACHIEVED",
      icon: "❤️",
    },
  });

  const badge3 = await prisma.badge.create({
    data: {
      name: "30日連続ログイン",
      type: "CONSECUTIVE_LOGIN",
      icon: "🏆",
    },
  });

  // Assign badges to user
  await prisma.userBadge.createMany({
    data: [
      { userId: employee.id, badgeId: badge1.id },
      { userId: employee.id, badgeId: badge2.id },
      { userId: employee.id, badgeId: badge3.id },
    ],
  });

  // Create challenges
  const challenge1 = await prisma.challenge.create({
    data: {
      title: "睡眠の質改善チャレンジ",
      description: "良質な睡眠を取るための習慣を身につけます",
      level: "INTERMEDIATE",
      stars: 4,
      priority: 1,
    },
  });

  const challenge2 = await prisma.challenge.create({
    data: {
      title: "疲労回復チャレンジ",
      description: "日々の疲労を効果的に回復します",
      level: "BEGINNER",
      stars: 3,
      priority: 2,
    },
  });

  // Create recipes
  const recipe1 = await prisma.recipe.create({
    data: {
      challengeId: challenge1.id,
      title: "寝る2時間前スマホOFF習慣",
      description: "スマートフォンのブルーライトを避け、良質な睡眠を促進",
      duration: 14,
      objective: "睡眠の質向上",
      expertComment: "ブルーライトはメラトニンの分泌を抑制します",
    },
  });

  // Create missions
  await prisma.mission.createMany({
    data: [
      {
        recipeId: recipe1.id,
        title: "スマホを別の部屋に置く",
        description: "就寝2時間前になったら、スマートフォンを寝室以外の場所に置きます",
        type: "SLEEP",
        dayNumber: 1,
      },
      {
        recipeId: recipe1.id,
        title: "リラックス音楽を聴く",
        description: "代わりにリラックスできる音楽や音声を聴いて過ごします",
        type: "SLEEP",
        dayNumber: 2,
      },
    ],
  });

  // Create supplements
  const supplement1 = await prisma.supplement.create({
    data: {
      name: "マグネシウムα",
      description: "睡眠の質向上に効果的なマグネシウムサプリメント",
      efficacy: "睡眠の質向上、筋肉のリラックス、ストレス軽減",
      sideEffects: "まれに下痢を起こすことがあります",
      productCode: "00000000",
      recommendedTime: "22:00",
    },
  });

  const supplement2 = await prisma.supplement.create({
    data: {
      name: "GABA",
      description: "リラックス効果のあるサプリメント",
      efficacy: "リラックス、ストレス軽減",
      recommendedTime: "22:00",
    },
  });

  // Create notifications
  await prisma.notification.createMany({
    data: [
      {
        userId: employee.id,
        type: "ANNOUNCEMENT",
        title: "お知らせ",
        content: "キャンペーンの期間のお知らせがきました。",
        isRead: false,
      },
      {
        userId: employee.id,
        type: "CHAT",
        title: "チャット",
        content: "チャットが届きました。",
        isRead: false,
      },
    ],
  });

  console.log("Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

