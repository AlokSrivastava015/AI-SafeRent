from fastapi import APIRouter, Depends
from app.core.dependencies import get_current_student
from app.db.models import Profile
from app.schemas.common import Success
router=APIRouter(prefix="/api/recommendations", tags=["Recommendations"])
@router.get("")
async def recommendations(user: Profile=Depends(get_current_student)):
    return Success(data={"items": [], "message":"Recommendation scoring is ready for property and preference data."})
