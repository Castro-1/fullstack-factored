from fastapi.security import OAuth2PasswordBearer
import os
from database import SessionLocal

SECRET_KEY = os.getenv("SECRET_KEY", "factored")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
