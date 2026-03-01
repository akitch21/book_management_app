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

type BookData = {
  title: string
  author: string
  page: number
  genre: string
  tag: string
  image: string
}

const defaultBook: BookData = {
  title: "",
  author: "",
  page: 0,
  genre: "",
  tag: "",
  image: "",
}

export function BookDialog({
  initialData = defaultBook,
  triggerLabel = "書籍追加",
  dialogTitle,
}: {
  initialData?: BookData
  triggerLabel?: string
  dialogTitle?: string
}) {
  const [open, setOpen] = React.useState(false)
  const [formData, setFormData] = React.useState<BookData>(initialData)

  React.useEffect(() => {
    setFormData(initialData)
  }, [initialData])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // TODO: API連携時に formData を送信
    console.log("book payload", formData)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form onSubmit={handleSubmit}>
        <DialogTrigger asChild>
          <Button variant="outline">{triggerLabel}</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{dialogTitle ?? (triggerLabel === "編集" ? "書籍編集" : "書籍追加")}</DialogTitle>
            <DialogDescription>
              書籍データを入力して保存できます。
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="book-title">タイトル</Label>
              <Input
                id="book-title"
                value={formData.title}
                onChange={(event) =>
                  setFormData((prev) => ({ ...prev, title: event.target.value }))
                }
              />
            </Field>
            <Field>
              <Label htmlFor="book-author">著者</Label>
              <Input
                id="book-author"
                value={formData.author}
                onChange={(event) =>
                  setFormData((prev) => ({ ...prev, author: event.target.value }))
                }
              />
            </Field>
            <Field>
              <Label htmlFor="book-page">ページ数</Label>
              <Input
                id="book-page"
                type="number"
                value={formData.page}
                onChange={(event) =>
                  setFormData((prev) => ({
                    ...prev,
                    page: Number(event.target.value),
                  }))
                }
              />
            </Field>
            <Field>
              <Label htmlFor="book-genre">ジャンル</Label>
              <Input
                id="book-genre"
                value={formData.genre}
                onChange={(event) =>
                  setFormData((prev) => ({ ...prev, genre: event.target.value }))
                }
              />
            </Field>
            <Field>
              <Label htmlFor="book-tag">タグ</Label>
              <Input
                id="book-tag"
                value={formData.tag}
                onChange={(event) =>
                  setFormData((prev) => ({ ...prev, tag: event.target.value }))
                }
              />
            </Field>
            <Field>
              <Label htmlFor="book-image">画像URL</Label>
              <Input
                id="book-image"
                value={formData.image}
                onChange={(event) =>
                  setFormData((prev) => ({ ...prev, image: event.target.value }))
                }
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
