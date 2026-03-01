"use client"

import * as React from "react"

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
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { library_books } from "../../../../data/data"

type RecordMemo = {
  page: number
  content: string
  tag: string
}

type RecordData = {
  id: number
  book_id: string
  status: "unread" | "reading" | "completed"
  memo: RecordMemo
}

const defaultRecord: RecordData = {
  id: 2,
  book_id: "The Great Gatsby",
  status: "unread",
  memo: {
    page: 50,
    content: "review chapter 3",
    tag: "urgent",
  },
}

export function RecordDialog({ initialData = defaultRecord }: { initialData?: RecordData }) {
  const [open, setOpen] = React.useState(false)
  const [formData, setFormData] = React.useState<RecordData>(initialData)

  React.useEffect(() => {
    setFormData(initialData)
  }, [initialData])

  const [suggestions, setSuggestions] = React.useState<string[]>([])
  const [showDropdown, setShowDropdown] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    const normalized = formData.book_id.trim().toLowerCase()
    setSuggestions(
      library_books
        .map((b) => b.book_info.book_title)
        .filter((title) => title.toLowerCase().includes(normalized))
    )
  }, [formData.book_id])

  // hide dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleChange = (
    key: "id" | "book_id" | "status" | "memo.page" | "memo.content" | "memo.tag",
    value: string
  ) => {
    setFormData((prev) => {
      if (key === "id") {
        return { ...prev, [key]: Number(value) }
      }

      if (key === "book_id") {
        return { ...prev, book_id: value }
      }

      if (key === "status") {
        return { ...prev, status: value as RecordData["status"] }
      }

      if (key === "memo.page") {
        return { ...prev, memo: { ...prev.memo, page: Number(value) } }
      }

      if (key === "memo.content") {
        return { ...prev, memo: { ...prev.memo, content: value } }
      }

      return { ...prev, memo: { ...prev.memo, tag: value } }
    })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // TODO: API連携時に formData を送信
    console.log("record payload", formData)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form onSubmit={handleSubmit}>
        <DialogTrigger asChild>
          <Button variant="outline">記録追加</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>書籍記録</DialogTitle>
            <DialogDescription>
              記録データを編集して保存できます。
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field className="relative" ref={inputRef as any}>
              <Label htmlFor="book-id">書籍</Label>
              <Input
                id="book-id"
                name="book_name"
                type="text"
                value={formData.book_id}
                onChange={(event) => {
                  handleChange("book_id", event.target.value)
                  setShowDropdown(true)
                }}
                onFocus={() => setShowDropdown(true)}
                autoComplete="off"
              />
              {showDropdown && suggestions.length > 0 && (
                <ul className="absolute top-full z-10 mt-1 max-h-40 w-full overflow-auto rounded-md border bg-white shadow-md">
                  {suggestions.map((title) => (
                    <li
                      key={title}
                      className="cursor-pointer px-3 py-2 hover:bg-gray-100"
                      onMouseDown={() => {
                        // use mouseDown to avoid losing focus before click
                        handleChange("book_id", title)
                        setShowDropdown(false)
                      }}
                    >
                      {title}
                    </li>
                  ))}
                </ul>
              )}
            </Field>
            <Field>
              <Label htmlFor="record-status">ステータス</Label>
              <select
                id="record-status"
                name="record_status"
                value={formData.status}
                onChange={(event) => handleChange("status", event.target.value)}
                title="ステータス"
                className="border-input bg-transparent focus-visible:border-ring focus-visible:ring-ring/50 h-9 w-full rounded-md border px-3 py-1 text-sm shadow-xs outline-none focus-visible:ring-[3px]"
              >
                <option value="unread">未読</option>
                <option value="reading">読書中</option>
                <option value="completed">読了</option>
              </select>
            </Field>
            <Field>
              <Label htmlFor="memo-page">メモページ</Label>
              <Input
                id="memo-page"
                name="memo_page"
                type="number"
                value={formData.memo.page}
                onChange={(event) => handleChange("memo.page", event.target.value)}
              />
            </Field>
            <Field>
              <Label htmlFor="memo-content">メモ内容</Label>
              <textarea
                id="memo-content"
                name="memo_content"
                placeholder="メモ内容"
                value={formData.memo.content}
                onChange={(event) => handleChange("memo.content", event.target.value)}
                className="border-input bg-transparent focus-visible:border-ring focus-visible:ring-ring/50 min-h-24 w-full rounded-md border px-3 py-2 text-sm shadow-xs outline-none focus-visible:ring-[3px]"
              />
            </Field>
            <Field>
              <Label htmlFor="memo-tag">メモタグ</Label>
              <Input
                id="memo-tag"
                name="memo_tag"
                value={formData.memo.tag}
                onChange={(event) => handleChange("memo.tag", event.target.value)}
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                キャンセル
              </Button>
            </DialogClose>
            <Button type="submit">保存</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
