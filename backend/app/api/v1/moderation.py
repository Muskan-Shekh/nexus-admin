from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.moderation import ModerationItemCreate, ModerationItemUpdate, ModerationItemResponse

router = APIRouter()


@router.get("/", response_model=list[ModerationItemResponse])
async def list_moderation(db: Session = Depends(get_db)):
    from app.models import ModerationItem
    return db.query(ModerationItem).all()


@router.get("/{item_id}", response_model=ModerationItemResponse)
async def get_moderation_item(item_id: str, db: Session = Depends(get_db)):
    from app.models import ModerationItem
    item = db.query(ModerationItem).filter(ModerationItem.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    return item


@router.post("/", response_model=ModerationItemResponse)
async def create_moderation_item(data: ModerationItemCreate, db: Session = Depends(get_db)):
    from app.models import ModerationItem
    item = ModerationItem(**data.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


@router.patch("/{item_id}", response_model=ModerationItemResponse)
async def update_moderation_item(item_id: str, data: ModerationItemUpdate, db: Session = Depends(get_db)):
    from app.models import ModerationItem
    item = db.query(ModerationItem).filter(ModerationItem.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(item, field, value)
    db.commit()
    db.refresh(item)
    return item
