from fastapi import APIRouter

from testdata import users



router = APIRouter()

@router.get("/user")
async def read_user():
    return users