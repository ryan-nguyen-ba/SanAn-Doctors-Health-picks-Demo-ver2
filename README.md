# Health Picks Demo Application

健康経営支援とサプリメント継続利用促進プラットフォームのデモアプリケーション

## 技術スタック

- **Frontend**: Next.js 14+ (App Router), TypeScript, React
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS
- **Charts**: Recharts

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env` ファイルを作成し、以下の変数を設定してください：

```env
DATABASE_URL="postgresql://user:password@localhost:5432/healthpicks?schema=public"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
```

### 3. データベースのセットアップ

```bash
# Prisma マイグレーション
npx prisma migrate dev

# シードデータの投入
npm run db:seed
```

### 4. 開発サーバーの起動

```bash
npm run dev
```

アプリケーションは `http://localhost:3000` で起動します。

## 機能

### 従業員向け機能

- ダッシュボード（トップページ）
- アンケート画面
- チャレンジ一覧・詳細
- レシピ詳細
- ミッション実行
- チャレンジ実感チェック
- スコアボード
- 設定・マイページ
- マイサプリ
- 副作用・体調記録
- チャット

### 管理者向け機能

- 管理者ダッシュボード
- チャレンジ分析
- 健康レポート
- 通知管理
- ユーザー管理
- 社販管理
- お知らせ発信

## デフォルトアカウント

- **従業員**: `employee@example.com` / `password123`
- **管理者**: `admin@example.com` / `password123`

## プロジェクト構造

```
/
├── app/                    # Next.js App Router
│   ├── (employee)/        # 従業員向けルート
│   ├── (admin)/          # 管理者向けルート
│   └── api/              # API エンドポイント
├── components/            # React コンポーネント
│   ├── ui/               # 基本UIコンポーネント
│   ├── employee/         # 従業員向けコンポーネント
│   ├── admin/            # 管理者向けコンポーネント
│   └── shared/           # 共有コンポーネント
├── lib/                  # ユーティリティ
│   ├── db/              # データベースクライアント
│   └── auth/            # 認証設定
└── prisma/              # Prisma スキーマ
```

## ライセンス

このプロジェクトはデモ目的で作成されています。

