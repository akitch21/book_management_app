"use client"

import * as React from "react"
import { DashboardPageLayout } from "@/components/dashboard-page-layout"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DeleteAlertButton } from "@/components/shared/settings/delete-button"



export default function Page() {
  const [username, setUsername] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [currentPassword, setCurrentPassword] = React.useState("")
  const [newPassword, setNewPassword] = React.useState("")
  const [notificationEmail, setNotificationEmail] = React.useState(true)
  const [notificationCommunity, setNotificationCommunity] = React.useState(false)

  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log("settings payload", {
      username,
      email,
      currentPassword,
      newPassword,
      notificationEmail,
      notificationCommunity,
    })
  }

  const handleDeleteAccount = () => {
    console.log("delete account requested")
  }

  return (
    <DashboardPageLayout title="設定">
      <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min p-6">
        <form onSubmit={handleSave}>
          <FieldGroup className="max-w-2xl gap-6">
            <div className="rounded-lg border p-4">
              <h2 className="mb-4 text-sm font-medium">プロフィール</h2>
              <FieldGroup className="gap-4">
                <Field className="gap-1.5">
                  <Label htmlFor="settings-username">ユーザーネーム</Label>
                  <Input
                    id="settings-username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    placeholder="ユーザーネームを入力"
                  />
                </Field>
                <Field className="gap-1.5">
                  <Label htmlFor="settings-email">メールアドレス</Label>
                  <Input
                    id="settings-email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="email@example.com"
                  />
                </Field>
              </FieldGroup>
            </div>

            <div className="rounded-lg border p-4">
              <h2 className="mb-4 text-sm font-medium">パスワード変更</h2>
              <FieldGroup className="gap-4">
                <Field className="gap-1.5">
                  <Label htmlFor="settings-current-password">現在のパスワード</Label>
                  <Input
                    id="settings-current-password"
                    type="password"
                    value={currentPassword}
                    onChange={(event) => setCurrentPassword(event.target.value)}
                  />
                </Field>
                <Field className="gap-1.5">
                  <Label htmlFor="settings-new-password">新しいパスワード</Label>
                  <Input
                    id="settings-new-password"
                    type="password"
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                  />
                </Field>
              </FieldGroup>
            </div>

            <div className="rounded-lg border p-4">
              <h2 className="mb-4 text-sm font-medium">通知設定</h2>
              <FieldGroup className="gap-3">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={notificationEmail}
                    onChange={(event) => setNotificationEmail(event.target.checked)}
                  />
                  メール通知を受け取る
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={notificationCommunity}
                    onChange={(event) => setNotificationCommunity(event.target.checked)}
                  />
                  コミュニティ更新通知を受け取る
                </label>
              </FieldGroup>
            </div>

            <div className="flex justify-end gap-2">
              <Button type="submit">保存</Button>
            </div>

            <div className="rounded-lg border border-destructive/40 p-4">
              <h2 className="mb-2 text-sm font-medium">アカウント削除</h2>
              <p className="text-muted-foreground mb-4 text-sm">
                この操作は取り消せません。実行するとアカウント情報が削除されます。
              </p>
              <DeleteAlertButton />
            </div>
          </FieldGroup>
        </form>
      </div>
    </DashboardPageLayout>
  )
}
