from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class EpisodeBase(BaseModel):
    title: str
    content: str
    character_id: str
    order: int = 0
    status: str = "draft"
    scheduled_at: Optional[datetime] = None


class EpisodeCreate(EpisodeBase):
    pass


class EpisodeUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    order: Optional[int] = None
    status: Optional[str] = None
    scheduled_at: Optional[datetime] = None


class EpisodeResponse(EpisodeBase):
    id: str
    slug: str
    ai_generated: bool
    confidence: Optional[float] = None
    model: Optional[str] = None
    cost: Optional[float] = None
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}
