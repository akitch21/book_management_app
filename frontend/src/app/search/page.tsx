"use client"


import * as React from "react"
import { DashboardPageLayout } from "@/components/dashboard-page-layout"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { ShowDropdown } from "@/components/shared/library/show-dropdown"
import { library_books } from "../../../data/data"

export default function Page() {
  const [title, setTitle] = React.useState("")
  const [author, setAuthor] = React.useState("")
  const [genre, setGenre] = React.useState("")
  const [ratingMin, setRatingMin] = React.useState("")
  const [ratingMax, setRatingMax] = React.useState("")
  const [keywords, setKeywords] = React.useState("")
  const [sortMode, setSortMode] = React.useState("updated-desc")
  const [searchFilters, setSearchFilters] = React.useState({
    title: "",
    author: "",
    genre: "",
    ratingMin: "",
    ratingMax: "",
    keywords: "",
  })

  const genreOptions = React.useMemo(() => {
    return Array.from(
      new Set(library_books.flatMap((book) => book.book_info.genre))
    ).sort((a, b) => a.localeCompare(b, "ja"))
  }, [])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextFilters = {
      title,
      author,
      genre,
      ratingMin,
      ratingMax,
      keywords,
    }
    setSearchFilters(nextFilters)
    console.log("search condition", nextFilters)
  }

  const handleReset = () => {
    setTitle("")
    setAuthor("")
    setGenre("")
    setRatingMin("")
    setRatingMax("")
    setKeywords("")
    setSearchFilters({
      title: "",
      author: "",
      genre: "",
      ratingMin: "",
      ratingMax: "",
      keywords: "",
    })
  }

  const sortOptions = [
    { label: "レビュー評価が高い", value: "rating-desc" },
    { label: "レビュー評価が低い", value: "rating-asc" },
    { label: "ウィークリー閲覧数", value: "view-count-desc" },
    { label: "マンスリー閲覧数", value: "monthly-view-count-desc" },
    { label: "1年間の閲覧数", value: "yearly-view-count-desc" },
    { label: "ランダム", value: "random" },
  ]

  const filteredAndSortedBooks = React.useMemo(() => {
    const normalizedTitle = searchFilters.title.trim().toLowerCase()
    const normalizedAuthor = searchFilters.author.trim().toLowerCase()
    const normalizedGenre = searchFilters.genre.trim().toLowerCase()
    const keywordTokens = searchFilters.keywords
      .toLowerCase()
      .split(/[,\s]+/)
      .map((token) => token.trim())
      .filter(Boolean)
    const min = searchFilters.ratingMin === "" ? null : Number(searchFilters.ratingMin)
    const max = searchFilters.ratingMax === "" ? null : Number(searchFilters.ratingMax)

    const filtered = library_books.filter((book) => {
      const titleText = book.book_info.book_title.toLowerCase()
      const authorText = book.book_info.book_author.toLowerCase()
      const genreText = book.book_info.genre.join(" ").toLowerCase()
      const tagText = book.book_tag.join(" ").toLowerCase()
      const searchableText = `${titleText} ${authorText} ${genreText} ${tagText}`
      const ratingValue =
        typeof (book as { review_rating?: number }).review_rating === "number"
          ? (book as { review_rating?: number }).review_rating ?? null
          : null

      if (normalizedTitle && !titleText.includes(normalizedTitle)) {
        return false
      }
      if (normalizedAuthor && !authorText.includes(normalizedAuthor)) {
        return false
      }
      if (normalizedGenre && !genreText.includes(normalizedGenre)) {
        return false
      }
      if (keywordTokens.length > 0 && !keywordTokens.every((token) => searchableText.includes(token))) {
        return false
      }
      if (min !== null && (ratingValue === null || ratingValue < min)) {
        return false
      }
      if (max !== null && (ratingValue === null || ratingValue > max)) {
        return false
      }
      return true
    })

    // TODO: 並び替えロジックは後で実装する
    return filtered
  }, [searchFilters, sortMode])

  return (
    <DashboardPageLayout title="書籍検索">
      <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min p-6">
        <ResizablePanelGroup
          direction="vertical"
          className="h-[calc(100vh-12rem)] min-h-[480px] rounded-lg border bg-background"
        >
          <ResizablePanel defaultSize={70} minSize={25}>
            <div className="h-full p-4">
              <div className="mb-3 flex items-center gap-3">
                <h2 className="text-sm font-medium">検索結果</h2>
                <span className="text-muted-foreground text-xs">{filteredAndSortedBooks.length}件</span>
                <div className="ml-auto">
                  <ShowDropdown
                    title="並び替え"
                    options={sortOptions}
                    value={sortMode}
                    onChange={setSortMode}
                  />
                </div>
              </div>
              <div className="h-[calc(100%-2.5rem)] overflow-auto rounded-md border">
                {filteredAndSortedBooks.length === 0 ? (
                  <div className="text-muted-foreground flex h-full items-center justify-center text-sm">
                    該当する書籍がありません
                  </div>
                ) : (
                  <div className="divide-y">
                    {filteredAndSortedBooks.map((book) => (
                      <div key={book.id} className="p-3">
                        <p className="font-medium">{book.book_info.book_title}</p>
                        <p className="text-muted-foreground text-sm">
                          著者: {book.book_info.book_author} / ジャンル: {book.book_info.genre.join(", ")}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={30} minSize={20}>
            <div className="h-full p-4">
              <h2 className="mb-2 text-sm font-medium">検索条件</h2>
              <form onSubmit={handleSubmit} className="mt-3">
                <FieldGroup className="gap-4">
                  <Field className="gap-1.5">
                    <Label htmlFor="search-title">タイトル名</Label>
                    <Input
                      id="search-title"
                      value={title}
                      onChange={(event) => setTitle(event.target.value)}
                      placeholder="例: Clean Code"
                    />
                  </Field>
                  <Field className="gap-1.5">
                    <Label htmlFor="search-author">著書名</Label>
                    <Input
                      id="search-author"
                      value={author}
                      onChange={(event) => setAuthor(event.target.value)}
                      placeholder="例: Robert C. Martin"
                    />
                  </Field>
                  <Field className="gap-1.5">
                    <Label htmlFor="search-genre">ジャンル</Label>
                    <select
                      id="search-genre"
                      aria-label="ジャンル"
                      value={genre}
                      onChange={(event) => setGenre(event.target.value)}
                      className="border-input bg-transparent focus-visible:border-ring focus-visible:ring-ring/50 h-9 w-full rounded-md border px-3 py-1 text-sm shadow-xs outline-none focus-visible:ring-[3px]"
                    >
                      <option value="">すべて</option>
                      {genreOptions.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field className="gap-1.5">
                    <Label>レビュー評価 (0.0 ~ 5.0)</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        id="search-rating-min"
                        type="number"
                        min={0}
                        max={5}
                        step={0.1}
                        value={ratingMin}
                        onChange={(event) => setRatingMin(event.target.value)}
                        placeholder="以上"
                      />
                      <Input
                        id="search-rating-max"
                        type="number"
                        min={0}
                        max={5}
                        step={0.1}
                        value={ratingMax}
                        onChange={(event) => setRatingMax(event.target.value)}
                        placeholder="以下"
                      />
                    </div>
                  </Field>
                  <Field className="gap-1.5">
                    <Label htmlFor="search-keywords">関連キーワード</Label>
                    <Input
                      id="search-keywords"
                      value={keywords}
                      onChange={(event) => setKeywords(event.target.value)}
                      placeholder="例: 設計, リファクタリング"
                    />
                  </Field>
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={handleReset}>
                      リセット
                    </Button>
                    <Button type="submit">検索</Button>
                  </div>
                </FieldGroup>
              </form>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </DashboardPageLayout>
  )
}
