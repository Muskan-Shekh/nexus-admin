from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.character import CharacterCreate, CharacterUpdate, CharacterResponse, CharacterGenerateRequest
from app.models import Character

router = APIRouter()


@router.get("/", response_model=list[CharacterResponse])
async def list_characters(db: Session = Depends(get_db)):
    return db.query(Character).all()


@router.get("/{character_id}", response_model=CharacterResponse)
async def get_character(character_id: str, db: Session = Depends(get_db)):
    character = db.query(Character).filter(Character.id == character_id).first()
    if not character:
        raise HTTPException(status_code=404, detail="Character not found")
    return character


@router.post("/", response_model=CharacterResponse)
async def create_character(data: CharacterCreate, db: Session = Depends(get_db)):
    character = Character(**data.model_dump())
    db.add(character)
    db.commit()
    db.refresh(character)
    return character


@router.patch("/{character_id}", response_model=CharacterResponse)
async def update_character(character_id: str, data: CharacterUpdate, db: Session = Depends(get_db)):
    character = db.query(Character).filter(Character.id == character_id).first()
    if not character:
        raise HTTPException(status_code=404, detail="Character not found")
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(character, field, value)
    db.commit()
    db.refresh(character)
    return character


@router.delete("/{character_id}")
async def delete_character(character_id: str, db: Session = Depends(get_db)):
    character = db.query(Character).filter(Character.id == character_id).first()
    if not character:
        raise HTTPException(status_code=404, detail="Character not found")
    db.delete(character)
    db.commit()
    return {"message": "Deleted"}


@router.post("/generate", response_model=CharacterResponse)
async def generate_character(data: CharacterGenerateRequest, db: Session = Depends(get_db)):
    character = Character(
        name="AI Generated Character",
        slug="ai-generated-character",
        persona=data.prompt,
        ai_generated=True,
        confidence=0.9,
        model="gpt-4o",
        cost=0.01,
    )
    db.add(character)
    db.commit()
    db.refresh(character)
    return character
