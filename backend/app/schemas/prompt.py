from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List, Dict, Any


class PromptVariable(BaseModel):
    name: str
    description: Optional[str] = None
    required: bool = False
    default_value: Optional[str] = None


class PromptBase(BaseModel):
    name: str
    content: str
    variables: List[PromptVariable] = []
    status: str = "draft"
    character_id: Optional[str] = None


class PromptCreate(PromptBase):
    pass


class PromptUpdate(BaseModel):
    name: Optional[str] = None
    content: Optional[str] = None
    variables: Optional[List[PromptVariable]] = None
    status: Optional[str] = None
    character_id: Optional[str] = None


class PromptResponse(PromptBase):
    id: str
    quality_score: Optional[float] = None
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}
