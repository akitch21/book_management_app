"use client"

import { ColumnDef } from "@tanstack/react-table"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { RecordDialog } from "@/components/shared/record/record-dialog"
import * as React from "react"

export type RecordStatus = "reading" | "completed" | "paused"

export type RecordMemoItem = {
  page: number
  content: string
  tag: string
  updatedAt: string
}

export type RecordItem = {
  id: string
  title: string
  status: RecordStatus
  updatedAt: string
  memos: RecordMemoItem[]
  progressValue: number
  progressLabel: string
}

const statusLabelMap: Record<RecordStatus, string> = {
  reading: "読書中",
  completed: "読了",
  paused: "中断",
}

function MemoEditDialog({
  recordId,
  memoIndex,
  memo,
}: {
  recordId: string
  memoIndex: number
  memo: RecordMemoItem
}) {
  const [open, setOpen] = React.useState(false)
  const [formData, setFormData] = React.useState<RecordMemoItem>(memo)

  React.useEffect(() => {
    setFormData(memo)
  }, [memo, open])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // TODO: API連携時に保存処理を実装
    console.log("memo edit payload", { recordId, memoIndex, memo: formData })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="outline" size="sm" className="h-7 px-2 text-xs">
          編集
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>コメント編集</DialogTitle>
            <DialogDescription>コメント内容を編集して保存できます。</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor={`memo-page-${recordId}-${memoIndex}`}>ページ</Label>
              <Input
                id={`memo-page-${recordId}-${memoIndex}`}
                type="number"
                value={formData.page}
                onChange={(event) =>
                  setFormData((prev) => ({
                    ...prev,
                    page: Number(event.target.value),
                  }))
                }
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor={`memo-tag-${recordId}-${memoIndex}`}>タグ</Label>
              <Input
                id={`memo-tag-${recordId}-${memoIndex}`}
                value={formData.tag}
                onChange={(event) =>
                  setFormData((prev) => ({
                    ...prev,
                    tag: event.target.value,
                  }))
                }
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor={`memo-content-${recordId}-${memoIndex}`}>内容</Label>
              <textarea
                id={`memo-content-${recordId}-${memoIndex}`}
                placeholder="メモの内容を入力してください"
                value={formData.content}
                onChange={(event) =>
                  setFormData((prev) => ({
                    ...prev,
                    content: event.target.value,
                  }))
                }
                className="border-input bg-transparent focus-visible:border-ring focus-visible:ring-ring/50 min-h-24 w-full rounded-md border px-3 py-2 text-sm shadow-xs outline-none focus-visible:ring-[3px]"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                キャンセル
              </Button>
            </DialogClose>
            <Button type="submit">保存</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export const columns: ColumnDef<RecordItem>[] = [
  {
    accessorKey: "title",
    header: "タイトル",
  },
  {
    accessorKey: "status",
    header: "ステータス",
    cell: ({ row }) => statusLabelMap[row.original.status],
  },
  {
    accessorKey: "updatedAt",
    header: "更新日",
  },
  {
    id: "progress",
    header: "進捗",
    cell: ({ row }) => (
      <div className="w-40 space-y-1">
        <Progress value={row.original.progressValue} />
        <p className="text-muted-foreground text-[11px]">{row.original.progressLabel}</p>
      </div>
    ),
  },
  {
    id: "memo",
    header: "メモ",
    cell: ({ row }) => {
      const memos = row.original.memos
      if (memos.length === 0) {
        return <span className="text-muted-foreground text-xs">メモなし</span>
      }

      return (
        <Accordion type="single" collapsible className="w-[480px]">
          <AccordionItem value={`memo-${row.original.id}`} className="border-b-0">
            <AccordionTrigger className="py-1 text-xs">メモ詳細 ({memos.length})</AccordionTrigger>
            <AccordionContent className="pb-1">
              <div className="space-y-2">
                {memos.map((memo, index) => (
                  <div key={`${row.original.id}-${index}`} className="rounded-md border p-2">
                    <div className="mb-1 flex items-center justify-between gap-2">
                      <p className="text-xs">ページ: {memo.page}</p>
                      <MemoEditDialog
                        recordId={row.original.id}
                        memoIndex={index}
                        memo={memo}
                      />
                    </div>
                    <p className="text-xs">タグ: {memo.tag}</p>
                    <p className="text-xs">内容: {memo.content}</p>
                    <p className="text-muted-foreground text-[11px]">更新: {memo.updatedAt}</p>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )
    },
  },
  {
    id: "add-record",
    header: "",
    cell: ({ row }) => {
      const initialStatus =
        row.original.status === "completed" ? "completed" : "reading"

      return (
        <RecordDialog
          initialData={{
            id: Number(row.original.id),
            book_id: row.original.title,
            status: initialStatus,
            memo: {
              page: 0,
              content: "",
              tag: "",
            },
          }}
        />
      )
    },
  },
]
