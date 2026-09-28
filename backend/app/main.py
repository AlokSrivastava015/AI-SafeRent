from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from app.core.config import get_settings
from app.db.database import engine
from app.api import auth, favorites, properties, recommendations, users, visits

settings=get_settings()
app=FastAPI(title="AI SafeRent API", version="1.0.0", description="Secure APIs for AI SafeRent's existing React application.")
app.add_middleware(CORSMiddleware, allow_origins=[settings.frontend_url, "http://localhost:5173"], allow_credentials=True, allow_methods=["GET","POST","PATCH","PUT","DELETE"], allow_headers=["Authorization","Content-Type"])
for router in (auth.router, users.router, properties.router, favorites.router, visits.router, recommendations.router): app.include_router(router)
@app.get("/health", tags=["Health"])
async def health(): return {"success": True, "data": {"status":"ok"}}

@app.get("/health/database", tags=["Health"], summary="Check database connectivity")
async def database_health():
    if engine is None:
        return {"success": False, "data": {"status": "not configured"}}
    try:
        async with engine.connect() as connection:
            await connection.execute(text("SELECT 1"))
        return {"success": True, "data": {"status": "connected"}}
    except Exception:
        # Do not expose driver details, host names, or credentials to a public endpoint.
        return {"success": False, "data": {"status": "unavailable"}}
