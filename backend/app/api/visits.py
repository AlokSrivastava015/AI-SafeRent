from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.dependencies import get_current_owner, get_current_student
from app.db.database import get_db
from app.db.models import Profile, Property, Visit, VisitStatus
from app.schemas.common import Success
from app.schemas.visit import VisitCreate, VisitReschedule
router=APIRouter(prefix="/api/visits", tags=["Visit requests"])
@router.post("", status_code=201)
async def create(payload: VisitCreate, student: Profile=Depends(get_current_student), db: AsyncSession=Depends(get_db)):
    prop=await db.get(Property, UUID(payload.property_id))
    if not prop or not prop.is_available: raise HTTPException(404,"Property not found")
    visit=Visit(student_id=student.id, owner_id=prop.owner_id, **payload.model_dump(exclude={"property_id"}), property_id=prop.id); db.add(visit); await db.commit(); return Success(data={"id":str(visit.id),"status":visit.status})
@router.get("/owner")
async def owner_requests(owner: Profile=Depends(get_current_owner), db: AsyncSession=Depends(get_db)):
    rows=(await db.scalars(select(Visit).where(Visit.owner_id==owner.id))).all(); return Success(data=[{"id":str(v.id),"student_id":str(v.student_id),"property_id":str(v.property_id),"status":v.status,"requested_date":v.requested_date} for v in rows])
@router.patch("/{visit_id}/{action}")
async def owner_action(visit_id: UUID, action: str, payload: VisitReschedule | None=None, owner: Profile=Depends(get_current_owner), db: AsyncSession=Depends(get_db)):
    visit=await db.get(Visit,visit_id)
    if not visit or visit.owner_id!=owner.id: raise HTTPException(404,"Visit not found")
    states={"accept":VisitStatus.ACCEPTED,"reject":VisitStatus.REJECTED,"cancel":VisitStatus.CANCELLED,"complete":VisitStatus.COMPLETED,"reschedule":VisitStatus.RESCHEDULED}
    if action not in states: raise HTTPException(404,"Unknown action")
    visit.status=states[action]
    if action=="reschedule":
        if not payload: raise HTTPException(422,"Reschedule details required")
        for k,v in payload.model_dump().items(): setattr(visit,k,v)
    await db.commit(); return Success(data={"id":str(visit.id),"status":visit.status})
