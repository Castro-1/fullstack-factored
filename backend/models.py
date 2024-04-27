from sqlalchemy import Column, Integer, String, Text
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True, nullable=False)
    hashed_password = Column(String(100), nullable=False)
    first_name = Column(String(50), nullable=False)
    last_name = Column(String(50), nullable=False)
    gender = Column(String(10), nullable=False)
    position = Column(String(50), nullable=False)
    skills = Column(Text, nullable=True)
