from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.conversation import ConversationResponse

router = APIRouter()


@router.get("/", response_model=list[ConversationResponse])
async def list_conversations(db: Session = Depends(get_db)):
    from app.models import Conversation
    return db.query(Conversation).all()


@router.get("/{conversation_id}", response_model=ConversationResponse)
async def get_conversation(conversation_id: str, db: Session = Depends(get_db)):
    from app.models import Conversation
    conversation = db.query(Conversation).filter(Conversation.id == conversation_id).first()
    if not conversation:
        raise HTTPException(status_code=404, detail="Conversation not found")
    return conversation
