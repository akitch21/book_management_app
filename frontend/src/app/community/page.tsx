import { DashboardPageLayout } from "@/components/dashboard-page-layout"

export default function Page() {
  return (
    <DashboardPageLayout title="コミュニティ">
      <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min p-6">
        コミュニティページ
      </div>
    </DashboardPageLayout>
  )
}
