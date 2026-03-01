import { DashboardPageLayout } from "@/components/dashboard-page-layout"

export default function Page() {
  return (
    <DashboardPageLayout title="お問い合わせ">
      <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min p-6">
        <h2 className="mb-4 text-lg font-medium">お問い合わせ</h2>
        <p className="text-muted-foreground mb-2 text-sm">
          お問い合わせは以下のメールアドレスまでお願いいたします。
        </p>
        <p className="text-muted-foreground text-sm">
          contact@example.com
        </p>
      </div>
    </DashboardPageLayout>
  )
}
