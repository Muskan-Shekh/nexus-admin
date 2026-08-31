from fastapi import APIRouter

router = APIRouter()


@router.get("/overview")
async def overview():
    return {
        "total_users": 3100,
        "total_conversations": 45621,
        "total_characters": 1284,
        "ai_generations": 34521,
        "avg_response_time": 1.2,
        "ai_cost": 1247.89,
    }
