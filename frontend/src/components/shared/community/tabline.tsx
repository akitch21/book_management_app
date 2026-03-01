"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function TabsLine() {
  return (
    <Tabs defaultValue="timeline" className="h-full">
      <TabsList variant="line">
        <TabsTrigger value="timeline">タイムライン</TabsTrigger>
        <TabsTrigger value="topics">トピック</TabsTrigger>
        <TabsTrigger value="members">メンバー</TabsTrigger>
      </TabsList>

      <TabsContent value="timeline" className="mt-4">
        <div className="space-y-3">
          <div className="rounded-lg border p-4">
            <p className="text-sm font-medium">新着投稿</p>
            <p className="text-muted-foreground mt-1 text-sm">
              コミュニティの最新投稿をここに表示します。
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <p className="text-sm font-medium">フォロー中の更新</p>
            <p className="text-muted-foreground mt-1 text-sm">
              フォローしているユーザーの活動を表示します。
            </p>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="topics" className="mt-4">
        <div className="rounded-lg border p-4">
          <p className="text-sm font-medium">人気トピック</p>
          <p className="text-muted-foreground mt-1 text-sm">
            ジャンル別・タグ別の注目トピックを表示します。
          </p>
        </div>
      </TabsContent>

      <TabsContent value="members" className="mt-4">
        <div className="rounded-lg border p-4">
          <p className="text-sm font-medium">おすすめメンバー</p>
          <p className="text-muted-foreground mt-1 text-sm">
            活動が活発なメンバーを表示します。
          </p>
        </div>
      </TabsContent>
    </Tabs>
  )
}
