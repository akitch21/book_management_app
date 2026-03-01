import { DashboardPageLayout } from "@/components/dashboard-page-layout"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

export default function Page() {
  return (
    <DashboardPageLayout title="書籍検索">
      <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min p-6">
        <ResizablePanelGroup
          direction="vertical"
          className="h-[calc(100vh-12rem)] min-h-[480px] rounded-lg border bg-background"
        >
          <ResizablePanel defaultSize={50} minSize={25}>
            <div className="h-full p-4">
              <h2 className="mb-2 text-sm font-medium">検索結果</h2>
              <div className="text-muted-foreground text-sm">上段コンテンツ</div>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={50} minSize={25}>
            <div className="h-full p-4">
              <h2 className="mb-2 text-sm font-medium">詳細</h2>
              <div className="text-muted-foreground text-sm">下段コンテンツ</div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </DashboardPageLayout>
  )
}
