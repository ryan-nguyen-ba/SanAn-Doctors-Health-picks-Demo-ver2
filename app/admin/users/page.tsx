"use client";

import { useState } from "react";
import { AdminLayout } from "@/components/shared/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Upload, X, CheckCircle } from "lucide-react";

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");
  const [showBulkImport, setShowBulkImport] = useState(false);
  const [importFile, setImportFile] = useState<File | null>(null);
  const [importPreview, setImportPreview] = useState<any[]>([]);
  const [importSuccess, setImportSuccess] = useState(false);

  const users = [
    {
      id: "1",
      name: "加藤佳子",
      email: "kato@example.com",
      department: "営業",
      progress: 75,
      score: 850,
    },
    {
      id: "2",
      name: "山田太郎",
      email: "yamada@example.com",
      department: "開発",
      progress: 62,
      score: 720,
    },
    {
      id: "3",
      name: "佐藤花子",
      email: "sato@example.com",
      department: "人事",
      progress: 68,
      score: 680,
    },
  ];

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">利用者管理</h1>
        </div>

        {/* Bulk Import Modal */}
        {showBulkImport && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="max-w-2xl w-full shadow-large border-2 border-primary/20">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold text-gray-900">一括インポート</CardTitle>
                  <button
                    onClick={() => {
                      setShowBulkImport(false);
                      setImportFile(null);
                      setImportPreview([]);
                      setImportSuccess(false);
                    }}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </CardHeader>
              <CardContent className="pt-0 space-y-4">
                {!importSuccess ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-2">CSVファイルを選択</label>
                      <div className="border-2 border-dashed border-primary/30 rounded-xl p-8 text-center bg-gradient-to-br from-primary-light/10 to-white">
                        <Upload className="w-12 h-12 text-primary mx-auto mb-4 opacity-60" />
                        <input
                          type="file"
                          accept=".csv"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setImportFile(file);
                              // Mock preview data
                              setImportPreview([
                                { name: "加藤佳子", email: "kato@example.com", department: "営業" },
                                { name: "山田太郎", email: "yamada@example.com", department: "開発" },
                                { name: "佐藤花子", email: "sato@example.com", department: "人事" },
                              ]);
                            }
                          }}
                          className="hidden"
                          id="csv-upload"
                        />
                        <label htmlFor="csv-upload" className="cursor-pointer">
                          <Button variant="outline" className="font-semibold shadow-sm cursor-pointer w-full">
                            ファイルを選択
                          </Button>
                        </label>
                        {importFile && (
                          <p className="text-sm text-gray-600 mt-2">{importFile.name}</p>
                        )}
                      </div>
                    </div>
                    {importPreview.length > 0 && (
                      <div>
                        <p className="text-sm font-medium mb-2">プレビュー ({importPreview.length}件)</p>
                        <div className="max-h-48 overflow-y-auto border rounded-xl">
                          <table className="w-full text-sm">
                            <thead className="bg-gray-50 sticky top-0">
                              <tr>
                                <th className="p-2 text-left">名前</th>
                                <th className="p-2 text-left">メール</th>
                                <th className="p-2 text-left">部署</th>
                              </tr>
                            </thead>
                            <tbody>
                              {importPreview.map((row, idx) => (
                                <tr key={idx} className="border-t">
                                  <td className="p-2">{row.name}</td>
                                  <td className="p-2">{row.email}</td>
                                  <td className="p-2">{row.department}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                    <div className="flex space-x-3">
                      <Button
                        onClick={() => {
                          setImportSuccess(true);
                          setTimeout(() => {
                            setShowBulkImport(false);
                            setImportFile(null);
                            setImportPreview([]);
                            setImportSuccess(false);
                          }, 2000);
                        }}
                        disabled={!importFile}
                        className="font-semibold shadow-sm"
                      >
                        インポート実行
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setShowBulkImport(false);
                          setImportFile(null);
                          setImportPreview([]);
                        }}
                      >
                        キャンセル
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <p className="text-lg font-bold text-gray-900 mb-2">インポートが完了しました</p>
                    <p className="text-sm text-gray-600">{importPreview.length}件のユーザーを登録しました</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        <Card className="mb-6 shadow-medium">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold text-gray-900">検索</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <Input
              placeholder="名前、メールアドレス、部署で検索..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-xl border-2"
            />
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>ユーザー一覧</CardTitle>
              <Button
                onClick={() => setShowBulkImport(true)}
                className="font-semibold shadow-sm"
              >
                <Upload className="w-4 h-4 mr-2" />
                一括インポート
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">名前</th>
                    <th className="text-left p-2">メール</th>
                    <th className="text-left p-2">部署</th>
                    <th className="text-left p-2">進捗</th>
                    <th className="text-left p-2">スコア</th>
                    <th className="text-left p-2">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b">
                      <td className="p-2">{user.name}</td>
                      <td className="p-2">{user.email}</td>
                      <td className="p-2">
                        <Badge variant="secondary">{user.department}</Badge>
                      </td>
                      <td className="p-2">{user.progress}%</td>
                      <td className="p-2">{user.score}</td>
                      <td className="p-2">
                        <Button variant="outline" size="sm">
                          編集
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}

