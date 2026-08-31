from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List


class MediaAssetBase(BaseModel):
    name: str
    url: str
    mime_type: str
    size: int
    width: Optional[int] = None
    height: Optional[int] = None
    tags: List[str] = []


class MediaAssetCreate(MediaAssetBase):
    pass


class MediaAssetResponse(MediaAssetBase):
    id: str
    created_at: datetime

    model_config = {"from_attributes": True}
