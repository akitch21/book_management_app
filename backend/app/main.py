from fastapi import FastAPI

from api.endpoints import users
from api.endpoints.book import record_book

# メインの FastAPI アプリを `app` として公開する
app = FastAPI()
app.include_router(users.router)
app.include_router(record_book.router)


@app.get("/")
async def root():
    return {"message": "Hello Bigger Applications!"}