from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.episode import EpisodeCreate, EpisodeUpdate, EpisodeResponse

router = APIRouter()


@router.get("/", response_model=list[EpisodeResponse])
async def list_episodes(db: Session = Depends(get_db)):
    from app.models import Episode
    return db.query(Episode).all()


@router.get("/{episode_id}", response_model=EpisodeResponse)
async def get_episode(episode_id: str, db: Session = Depends(get_db)):
    from app.models import Episode
    episode = db.query(Episode).filter(Episode.id == episode_id).first()
    if not episode:
        raise HTTPException(status_code=404, detail="Episode not found")
    return episode


@router.post("/", response_model=EpisodeResponse)
async def create_episode(data: EpisodeCreate, db: Session = Depends(get_db)):
    from app.models import Episode
    episode = Episode(**data.model_dump())
    db.add(episode)
    db.commit()
    db.refresh(episode)
    return episode


@router.patch("/{episode_id}", response_model=EpisodeResponse)
async def update_episode(episode_id: str, data: EpisodeUpdate, db: Session = Depends(get_db)):
    from app.models import Episode
    episode = db.query(Episode).filter(Episode.id == episode_id).first()
    if not episode:
        raise HTTPException(status_code=404, detail="Episode not found")
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(episode, field, value)
    db.commit()
    db.refresh(episode)
    return episode


@router.delete("/{episode_id}")
async def delete_episode(episode_id: str, db: Session = Depends(get_db)):
    from app.models import Episode
    episode = db.query(Episode).filter(Episode.id == episode_id).first()
    if not episode:
        raise HTTPException(status_code=404, detail="Episode not found")
    db.delete(episode)
    db.commit()
    return {"message": "Deleted"}
