from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from jose import jwt
from utils import get_db, SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES
from models import User
import bcrypt

auth_router = APIRouter()

@auth_router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.username == form_data.username).first()

    if not db_user or not bcrypt.checkpw(form_data.password.encode("utf-8"), db_user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    expires = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    token_data = {"sub": db_user.username, "exp": expires}
    access_token = jwt.encode(token_data, SECRET_KEY, algorithm=ALGORITHM)

    return {"access_token": access_token, "token_type": "bearer"}
