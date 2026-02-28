import React from "react";

type BookRecord = {
  id: number;
  book_id: number;
  memo: {
    page: number;
    content: string;
    tag: string;
  };
};

export default async function Page() {
  const apiBase = process.env.INTERNAL_API_BASE ?? "http://backend:8000";
  const res = await fetch(`${apiBase}/books`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error(`Failed to fetch books: ${res.status}`);
  }

  const data = (await res.json()) as BookRecord[];

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
