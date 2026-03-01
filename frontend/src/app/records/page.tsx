"use client"
import { DashboardPageLayout } from "@/components/dashboard-page-layout"
import { ShowDropdown } from "@/components/shared/library/show-dropdown"
import * as React from "react"
import { FilterDropdown } from "@/components/shared/library/filter-dropdown"
import {
  columns,
  type RecordMemoItem,
  type RecordItem,
  type RecordStatus,
} from "@/components/shared/library/columns"
import { DataTable } from "@/components/shared/library/data-table"
import { library_books, record_book } from "../../../data/data"


export default function Page() {
  const [filterMode, setFilterMode] = React.useState<string[]>([])
  const [sortMode, setSortMode] = React.useState("updated-desc")

  const filterOptions = [
    { label: "読書中", value: "reading" },
    { label: "読了", value: "completed" },
    { label: "中断", value: "paused" },
  ]

  const sortOptions = [
    { label: "更新日が新しい順", value: "updated-desc" },
    { label: "更新日が古い順", value: "updated-asc" },
    { label: "タイトル昇順", value: "title-asc" },
    { label: "タイトル降順", value: "title-desc" },
  ]

  const records = React.useMemo<RecordItem[]>(() => {
    const bookMap = new Map(library_books.map((book) => [book.id, book]))
    const normalizeStatus = (value: string): RecordStatus => {
      if (value === "completed") {
        return "completed"
      }
      if (value === "paused") {
        return "paused"
      }
      return "reading"
    }

    return record_book.map((record) => {
      const relatedBook = bookMap.get(record.book_id)
      const totalPages = relatedBook?.book_info.book_page ?? 0
      const memos: RecordMemoItem[] = (Array.isArray(record.memo)
        ? record.memo
        : [record.memo]
      ).map((memo) => ({
        page: memo.page,
        content: memo.content,
        tag: memo.tag,
        updatedAt: memo.updated_at,
      }))

      const updatedAt = memos[memos.length - 1]?.updatedAt ?? ""
      const maxMemoPage = memos.reduce((maxPage, memo) => {
        return memo.page > maxPage ? memo.page : maxPage
      }, 0)
      const progressValue =
        record.status === "completed"
          ? 100
          : totalPages > 0
            ? Math.min(100, Math.round((maxMemoPage / totalPages) * 100))
            : 0
      const progressLabel =
        totalPages > 0
          ? record.status === "completed"
            ? `${totalPages} / ${totalPages} ページ`
            : `${Math.min(maxMemoPage, totalPages)} / ${totalPages} ページ`
          : "-"

      return {
        id: String(record.id),
        title: relatedBook?.book_info.book_title ?? `book_id:${record.book_id}`,
        status: normalizeStatus(record.status),
        updatedAt,
        memos,
        progressValue,
        progressLabel,
      }
    })
  }, [])

  const filteredAndSortedRecords = React.useMemo(() => {
    const filtered =
      filterMode.length === 0
        ? records
        : records.filter((record) => filterMode.includes(record.status))

    return [...filtered].sort((a, b) => {
      if (sortMode === "updated-desc") {
        return b.updatedAt.localeCompare(a.updatedAt)
      }
      if (sortMode === "updated-asc") {
        return a.updatedAt.localeCompare(b.updatedAt)
      }
      if (sortMode === "title-asc") {
        return a.title.localeCompare(b.title, "ja")
      }
      if (sortMode === "title-desc") {
        return b.title.localeCompare(a.title, "ja")
      }
      return 0
    })
  }, [filterMode, records, sortMode])

  return (
    <DashboardPageLayout title="書籍記録">
      <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min p-6">
        <div className="flex ">
          <div className="ml-auto flex gap-2">
            <FilterDropdown
              options={filterOptions}
              selectedValues={filterMode}
              onChange={setFilterMode}
            />
            <ShowDropdown
              title="並び替え"
              options={sortOptions}
              value={sortMode}
              onChange={setSortMode}
            />
          </div>
        </div>
        <div className="mt-4">
          <DataTable columns={columns} data={filteredAndSortedRecords} />
        </div>
      </div>
    </DashboardPageLayout>
  )
}
