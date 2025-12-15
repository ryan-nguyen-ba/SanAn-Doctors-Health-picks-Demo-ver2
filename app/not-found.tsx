import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background-secondary p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          ページが見つかりません
        </h2>
        <p className="text-gray-600 mb-8">
          お探しのページは存在しないか、移動または削除された可能性があります。
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/home">
            <Button>ホームに戻る</Button>
          </Link>
          <Link href="/signin">
            <Button variant="outline">ログイン</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

