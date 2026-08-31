from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List


class CharacterBase(BaseModel):
    name: str
    persona: str
    backstory: Optional[str] = None
    voice: Optional[str] = None
    avatar: Optional[str] = None
    genre: Optional[str] = None
    tags: List[str] = []
    status: str = "draft"
    featured: bool = False


class CharacterCreate(CharacterBase):
    pass


class CharacterUpdate(BaseModel):
    name: Optional[str] = None
    persona: Optional[str] = None
    backstory: Optional[str] = None
    voice: Optional[str] = None
    avatar: Optional[str] = None
    genre: Optional[str] = None
    tags: Optional[List[str]] = None
    status: Optional[str] = None
    featured: Optional[bool] = None


class CharacterResponse(CharacterBase):
    id: str
    slug: str
    version: int
    ai_generated: bool
    confidence: Optional[float] = None
    model: Optional[str] = None
    cost: Optional[float] = None
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


class CharacterGenerateRequest(BaseModel):
    prompt: str
