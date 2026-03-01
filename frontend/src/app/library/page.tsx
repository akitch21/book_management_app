"use client"
import * as React from "react"
import { DashboardPageLayout } from "@/components/dashboard-page-layout"
import { Button } from "@/components/ui/button"
import {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination"
import { Input } from "@/components/ui/input"
import { ShowDropdown } from "@/components/shared/library/show-dropdown"
import { library_books } from "../../../data/data"

type LibraryBook = (typeof library_books)[number]
const ITEMS_PER_PAGE = 6


export default function Page() {
  const [currentPage, setCurrentPage] = React.useState(1)
  const [displayMode, setDisplayMode] = React.useState("grid")
  const [sortMode, setSortMode] = React.useState("updated-desc")
  const [searchText, setSearchText] = React.useState("")

  const handlePageClick = (page: number) => {
    setCurrentPage(page)
  }

  const displayOptions = [
    { label: "グリッド表示", value: "grid" },
    { label: "リスト表示", value: "list" },
  ]

  const sortOptions = [
    { label: "更新日が新しい順", value: "updated-desc" },
    { label: "更新日が古い順", value: "updated-asc" },
    { label: "タイトル昇順", value: "title-asc" },
    { label: "タイトル降順", value: "title-desc" },
  ]

  const normalizedSearchText = searchText.trim().toLowerCase()

  const filteredAndSortedBooks = React.useMemo(() => {
    const filtered =
      normalizedSearchText.length === 0
        ? library_books
        : library_books.filter((book) => {
          const title = book.book_info.book_title.toLowerCase()
          const author = book.book_info.book_author.toLowerCase()
          const tag = book.book_tag.toLowerCase()
          return (
            title.includes(normalizedSearchText) ||
            author.includes(normalizedSearchText) ||
            tag.includes(normalizedSearchText)
          )
        })

    return [...filtered].sort((a, b) => {
      if (sortMode === "updated-desc") {
        return b.updated_at.localeCompare(a.updated_at)
      }
      if (sortMode === "updated-asc") {
        return a.updated_at.localeCompare(b.updated_at)
      }
      if (sortMode === "title-asc") {
        return a.book_info.book_title.localeCompare(b.book_info.book_title, "ja")
      }
      if (sortMode === "title-desc") {
        return b.book_info.book_title.localeCompare(a.book_info.book_title, "ja")
      }
      return 0
    })
  }, [normalizedSearchText, sortMode])

  const totalPages = Math.max(1, Math.ceil(filteredAndSortedBooks.length / ITEMS_PER_PAGE))

  React.useEffect(() => {
    setCurrentPage(1)
  }, [normalizedSearchText, sortMode])

  React.useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, totalPages])

  const pagedBooks = React.useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    const end = start + ITEMS_PER_PAGE
    return filteredAndSortedBooks.slice(start, end)
  }, [currentPage, filteredAndSortedBooks])

  const formatDate = (isoDate: string) =>
    new Intl.DateTimeFormat("ja-JP", { dateStyle: "medium" }).format(
      new Date(isoDate)
    )

  const renderBookItem = (book: LibraryBook) => (
    <article
      key={book.id}
      className="bg-card text-card-foreground rounded-lg border p-4 shadow-xs"
    >
      <div className="space-y-2">
        <h3 className="font-semibold leading-tight">{book.book_info.book_title}</h3>
        <p className="text-muted-foreground text-sm">著者: {book.book_info.book_author}</p>
        <p className="text-muted-foreground text-sm">ページ数: {book.book_info.book_page}</p>
        <p className="text-muted-foreground text-sm">タグ: {book.book_tag}</p>
        <p className="text-muted-foreground text-xs">更新日: {formatDate(book.updated_at)}</p>
      </div>
    </article>
  )

  return (
    <DashboardPageLayout title="書籍ライブラリ">
      <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min p-6 flex flex-col">
        <div className="flex ">
          <div className="flex items-center gap-4">
            <Input
              placeholder="書籍を検索"
              className="w-64"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
            />
          </div>
          <div className="ml-auto flex gap-2">
            <ShowDropdown
              title="表示"
              options={displayOptions}
              value={displayMode}
              onChange={setDisplayMode}
            />
            <ShowDropdown
              title="並び替え"
              options={sortOptions}
              value={sortMode}
              onChange={setSortMode}
            />
            <Button>書籍追加</Button>
            <Button>書籍選択</Button>
          </div>
        </div>

        {/* コンテンツ一覧をここに置く */}
        <div className="flex-1">
          {/* 書籍アイテムのグリッド・リスト */}
          <div className="text-muted-foreground text-sm mt-4 mb-4">
            表示: {displayOptions.find((option) => option.value === displayMode)?.label}
            {" / "}
            並び替え: {sortOptions.find((option) => option.value === sortMode)?.label}
          </div>
          {pagedBooks.length === 0 ? (
            <div className="text-muted-foreground rounded-md border py-16 text-center text-sm">
              該当する書籍がありません
            </div>
          ) : displayMode === "grid" ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {pagedBooks.map((book) => renderBookItem(book))}
            </div>
          ) : (
            <div className="space-y-3">
              {pagedBooks.map((book) => (
                <div key={book.id} className="bg-card text-card-foreground rounded-md border p-4">
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                    <p className="font-medium">{book.book_info.book_title}</p>
                    <p className="text-muted-foreground text-sm">著者: {book.book_info.book_author}</p>
                    <p className="text-muted-foreground text-sm">ページ数: {book.book_info.book_page}</p>
                    <p className="text-muted-foreground text-sm">タグ: {book.book_tag}</p>
                    <p className="text-muted-foreground text-xs">更新日: {formatDate(book.updated_at)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ページネーション */}
        <Pagination className="mt-6">
          <PaginationContent>
            <PaginationPrevious
              onClick={() => handlePageClick(Math.max(1, currentPage - 1))}
              className={currentPage === 1 ? "opacity-50 pointer-events-none" : ""}
            />
            {currentPage > 2 && (
              <PaginationLink onClick={() => handlePageClick(1)}>1</PaginationLink>
            )}
            {currentPage > 3 && <PaginationEllipsis />}
            {Array.from({ length: 3 }, (_, i) => {
              const page = currentPage + i - 1
              if (page < 1 || page > totalPages) {
                return null
              }
              return (
                <PaginationLink
                  key={page}
                  isActive={page === currentPage}
                  onClick={() => handlePageClick(page)}
                >
                  {page}
                </PaginationLink>
              )
            })}
            {currentPage < totalPages - 2 && <PaginationEllipsis />}
            {currentPage < totalPages - 1 && (
              <PaginationLink onClick={() => handlePageClick(totalPages)}>
                {totalPages}
              </PaginationLink>
            )}
            <PaginationNext
              onClick={() => handlePageClick(Math.min(totalPages, currentPage + 1))}
              className={currentPage === totalPages ? "opacity-50 pointer-events-none" : ""}
            />
          </PaginationContent>
        </Pagination>
      </div>
    </DashboardPageLayout>
  )
}
