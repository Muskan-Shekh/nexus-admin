from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.database import Base, engine
from app.api.v1 import auth, chats, episodes, story_flows, prompts, conversations, users, analytics, moderation, media, copilot


@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    yield


app = FastAPI(
    title="Nexus Admin API",
    description="AI-Native Admin & Content Control Plane API",
    version="0.1.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/v1/auth", tags=["auth"])
app.include_router(chats.router, prefix="/api/v1/chats", tags=["chats"])
app.include_router(episodes.router, prefix="/api/v1/episodes", tags=["episodes"])
app.include_router(story_flows.router, prefix="/api/v1/story-flows", tags=["story-flows"])
app.include_router(prompts.router, prefix="/api/v1/prompts", tags=["prompts"])
app.include_router(conversations.router, prefix="/api/v1/conversations", tags=["conversations"])
app.include_router(users.router, prefix="/api/v1/users", tags=["users"])
app.include_router(analytics.router, prefix="/api/v1/analytics", tags=["analytics"])
app.include_router(moderation.router, prefix="/api/v1/moderation", tags=["moderation"])
app.include_router(media.router, prefix="/api/v1/media", tags=["media"])
app.include_router(copilot.router, prefix="/api/v1/copilot", tags=["copilot"])


@app.get("/health")
async def health():
    return {"status": "ok"}
