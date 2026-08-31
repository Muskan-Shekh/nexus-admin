from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.story_flow import StoryFlowCreate, StoryFlowUpdate, StoryFlowResponse

router = APIRouter()


@router.get("/", response_model=list[StoryFlowResponse])
async def list_story_flows(db: Session = Depends(get_db)):
    from app.models import StoryFlow
    return db.query(StoryFlow).all()


@router.get("/{flow_id}", response_model=StoryFlowResponse)
async def get_story_flow(flow_id: str, db: Session = Depends(get_db)):
    from app.models import StoryFlow
    flow = db.query(StoryFlow).filter(StoryFlow.id == flow_id).first()
    if not flow:
        raise HTTPException(status_code=404, detail="Story flow not found")
    return flow


@router.post("/", response_model=StoryFlowResponse)
async def create_story_flow(data: StoryFlowCreate, db: Session = Depends(get_db)):
    from app.models import StoryFlow
    flow = StoryFlow(**data.model_dump())
    db.add(flow)
    db.commit()
    db.refresh(flow)
    return flow


@router.patch("/{flow_id}", response_model=StoryFlowResponse)
async def update_story_flow(flow_id: str, data: StoryFlowUpdate, db: Session = Depends(get_db)):
    from app.models import StoryFlow
    flow = db.query(StoryFlow).filter(StoryFlow.id == flow_id).first()
    if not flow:
        raise HTTPException(status_code=404, detail="Story flow not found")
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(flow, field, value)
    db.commit()
    db.refresh(flow)
    return flow


@router.delete("/{flow_id}")
async def delete_story_flow(flow_id: str, db: Session = Depends(get_db)):
    from app.models import StoryFlow
    flow = db.query(StoryFlow).filter(StoryFlow.id == flow_id).first()
    if not flow:
        raise HTTPException(status_code=404, detail="Story flow not found")
    db.delete(flow)
    db.commit()
    return {"message": "Deleted"}
