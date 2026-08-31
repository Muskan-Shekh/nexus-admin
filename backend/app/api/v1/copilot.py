from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter()


class CopilotMessage(BaseModel):
    role: str
    content: str


class CopilotChatRequest(BaseModel):
    messages: List[CopilotMessage]


class CopilotAction(BaseModel):
    type: str
    params: dict


class CopilotExecuteRequest(BaseModel):
    actions: List[CopilotAction]


@router.post("/chat")
async def chat(request: CopilotChatRequest):
    return {
        "message": "I've analyzed your request. Here's what I found:\n\n- 3 characters match your criteria\n- 2 episodes need review\n- Estimated cost: $0.24\n\nWould you like me to proceed?",
        "actions": [],
    }


@router.post("/execute")
async def execute(request: CopilotExecuteRequest):
    return {
        "results": [{"success": True, "message": "Action executed successfully"}],
    }
