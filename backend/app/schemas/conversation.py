from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class ConversationResponse(BaseModel):
    id: str
    user_id: str
    character_id: str
    message_count: int
    flagged: bool
    escalated: bool
    quality_score: Optional[float] = None
    started_at: datetime
    last_message_at: datetime

    model_config = {"from_attributes": True}
