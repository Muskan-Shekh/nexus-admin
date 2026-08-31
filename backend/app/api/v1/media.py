from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.media import MediaAssetCreate, MediaAssetResponse

router = APIRouter()


@router.get("/", response_model=list[MediaAssetResponse])
async def list_media(db: Session = Depends(get_db)):
    from app.models import MediaAsset
    return db.query(MediaAsset).all()


@router.get("/{asset_id}", response_model=MediaAssetResponse)
async def get_media(asset_id: str, db: Session = Depends(get_db)):
    from app.models import MediaAsset
    asset = db.query(MediaAsset).filter(MediaAsset.id == asset_id).first()
    if not asset:
        raise HTTPException(status_code=404, detail="Asset not found")
    return asset


@router.post("/", response_model=MediaAssetResponse)
async def create_media(data: MediaAssetCreate, db: Session = Depends(get_db)):
    from app.models import MediaAsset
    asset = MediaAsset(**data.model_dump())
    db.add(asset)
    db.commit()
    db.refresh(asset)
    return asset


@router.delete("/{asset_id}")
async def delete_media(asset_id: str, db: Session = Depends(get_db)):
    from app.models import MediaAsset
    asset = db.query(MediaAsset).filter(MediaAsset.id == asset_id).first()
    if not asset:
        raise HTTPException(status_code=404, detail="Asset not found")
    db.delete(asset)
    db.commit()
    return {"message": "Deleted"}
