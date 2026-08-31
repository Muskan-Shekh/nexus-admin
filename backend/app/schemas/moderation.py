from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class ModerationItemBase(BaseModel):
    type: str
    entity_type: str
    entity_id: str
    reason: str
    severity: str = "medium"
    status: str = "pending"


class ModerationItemCreate(ModerationItemBase):
    pass


class ModerationItemUpdate(BaseModel):
    status: Optional[str] = None
    severity: Optional[str] = None
    reviewed_by: Optional[str] = None
    reviewed_at: Optional[datetime] = None


class ModerationItemResponse(ModerationItemBase):
    id: str
    reviewed_by: Optional[str] = None
    reviewed_at: Optional[datetime] = None
    created_at: datetime

    model_config = {"from_attributes": True}
