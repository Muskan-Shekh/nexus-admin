from pydantic_settings import BaseSettings
from typing import List, Optional


class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql://postgres:12345678@localhost:5432/nexus"
    DB_HOST: str = "localhost"
    DB_PORT: str = "5432"
    DB_NAME: str = "nexus"
    DB_USER: str = "postgres"
    DB_PASSWORD: str = "12345678"
    REDIS_URL: str = "redis://localhost:6379/0"
    SECRET_KEY: str = "change-me-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    AI_API_URL: str = "http://localhost:8001"
    CORS_ORIGINS: List[str] = ["http://localhost:3000", "http://localhost:3001"]

    class Config:
        env_file = ".env"


settings = Settings()
