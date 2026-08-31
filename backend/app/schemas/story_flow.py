from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List, Dict, Any


class StoryFlowBase(BaseModel):
    name: str
    description: Optional[str] = None
    nodes: List[Dict[str, Any]] = []
    edges: List[Dict[str, Any]] = []
    published: bool = False


class StoryFlowCreate(StoryFlowBase):
    pass


class StoryFlowUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    nodes: Optional[List[Dict[str, Any]]] = None
    edges: Optional[List[Dict[str, Any]]] = None
    published: Optional[bool] = None


class StoryFlowResponse(StoryFlowBase):
    id: str
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}
