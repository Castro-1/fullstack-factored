from fastapi import FastAPI
from database import engine
import models
from routes.auth import auth_router
from routes.users import user_router

app = FastAPI()

models.Base.metadata.create_all(bind=engine)

app.include_router(auth_router)
app.include_router(user_router)
