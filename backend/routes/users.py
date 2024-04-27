from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from models import User
from utils import get_db, get_current_user
from pydantic import BaseModel
import json
from typing import List
import bcrypt

class UserCreate(BaseModel):
    username: str
    password: str
    first_name: str
    last_name: str
    gender: str
    position: str
    skills: list = []


class UserResponse(BaseModel):
    id: int
    username: str


class UserListResponse(BaseModel):
    id: int
    username: str
    first_name: str
    last_name: str
    gender: str
    position: str
    skills: list

user_router = APIRouter()

@user_router.post("/register", response_model=UserResponse)
def register(user: UserCreate, db: Session = Depends(get_db)):
    if db.query(User).filter(User.username == user.username).first():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already taken",
        )

    if len(user.skills) < 5:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User must have at least five skills",
        )

    for skill in user.skills:
        if not isinstance(skill, list) or len(skill) != 2:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Each skill must be a list with exactly two elements",
            )
        _, value = skill
        if not isinstance(value, int) or not (1 <= value <= 5):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Each skill value must be an integer between 1 and 5",
            )

    hashed_password = bcrypt.hashpw(user.password.encode("utf-8"), bcrypt.gensalt())

    new_user = User(
        username=user.username,
        hashed_password=hashed_password,
        first_name=user.first_name,
        last_name=user.last_name,
        gender=user.gender,
        position=user.position,
        skills=json.dumps(user.skills),
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"id": new_user.id, "username": new_user.username}


@user_router.get("/users", response_model=List[UserListResponse])
def list_users(db: Session = Depends(get_db), current_user: UserResponse = Depends(get_current_user)):
    users = db.query(User).all()

    for user in users:
        user.skills = json.loads(user.skills)

    return users
