# AI SafeRent API

## Setup

1. Copy `.env.example` to `.env` and supply Supabase server values. Keep the service-role key server-only.
2. Create a Supabase project, enable PostGIS (`create extension if not exists postgis;`), create private `property-images` and `profile-images` buckets, then apply the migration. On local Windows/IPv4 networks, use the exact **Session Pooler** connection string (port 5432) from Supabase Dashboard -> Connect. Do not use the direct `db.<project-ref>.supabase.co` connection unless your network supports IPv6 or the project has Supabase's IPv4 add-on.
3. Run `python -m venv venv`, `venv\Scripts\activate`, `pip install -r requirements.txt`.
4. Run `alembic upgrade head`, then `uvicorn app.main:app --reload`.

The API is documented at `/docs` and `/redoc`. Authentication is managed by Supabase Auth; send its access token as `Authorization: Bearer <token>`.

## Current frontend mapping

| Screen | Mock source | API | Tables |
|---|---|---|---|
| PGs / Flats / Rooms | `main.jsx` listing arrays | `GET /api/properties/search` | properties, amenities, property_images |
| Saved Properties | local state | `GET/POST/DELETE /api/favorites` | favorites |
| Book a Visit / owner requests | local state | `/api/visits` | visits, properties |
| Profile / Settings | hard-coded fields | `/api/users/me` | profiles, preferences |
| AI Recommendations | listing arrays | `/api/recommendations` | preferences, properties, neighborhood_scores |
| Owner dashboard | `ownerProperties`, `requests` | owner dashboard endpoint (next integration) | properties, bookings, visits, reviews |

## Remaining integration TODOs

- Add Supabase credentials and run the migration against the target project.
- Add the remaining routes for bookings, reviews, messages, notifications, storage uploads, dashboard aggregates and PostGIS nearby search.
- Replace each UI mock screen through the new `src/api` client, retaining loading, empty, and retry states.
