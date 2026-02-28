from typing import Any, List, Dict

from fastapi import APIRouter, HTTPException, Query, status
from testdata import record_book


router = APIRouter()

@router.get("/books")
async def read_books() -> List[Dict[str, Any]]:
    return record_book

@router.get("/book")
async def read_book_by_id(id: int = Query(..., description="Book id")) -> Dict[str, Any]:
    for book in record_book:
        if book.get("id") == id:
            return book
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Book not found")
