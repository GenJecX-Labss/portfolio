# GenJecX Portfolio - Full Stack Application

A comprehensive portfolio and client acquisition platform for AI/ML services, built with FastAPI (backend) and Next.js (frontend).

## Project Structure

```
portfolio/
├── backend/           # FastAPI backend
│   ├── app/          # Application code
│   │   ├── api/      # API routes
│   │   ├── core/     # Configuration, database, logging
│   │   ├── models/   # SQLAlchemy database models
│   │   ├── repositories/  # Data access layer
│   │   ├── schemas/  # Pydantic schemas
│   │   ├── services/ # Business logic
│   │   ├── security/ # Authentication, authorization
│   │   └── workflows/ # Multi-step business processes
│   └── migrations/   # Alembic database migrations
│
├── frontend/         # Next.js frontend
│   ├── src/
│   │   ├── app/      # Next.js app router pages
│   │   ├── components/ # React components
│   │   └── lib/      # Utilities and API client
│   └── public/       # Static assets
```

## Prerequisites

- **Python 3.10+** (for backend)
- **Node.js 18+** (for frontend)
- **PostgreSQL 15+** (database)
- **pnpm/npm/yarn** (package manager)

## Backend Setup

### 1. Navigate to backend directory

```bash
cd backend
```

### 2. Create virtual environment

```bash
python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure environment

Copy `.env.example` to `.env` and update values:

```bash
cp .env.example .env
```

Key environment variables:
- `DATABASE_URL`: PostgreSQL connection string
- `SECRET_KEY`: JWT secret key (change in production!)
- `CORS_ORIGINS`: Allowed frontend URLs
- `ADMIN_EMAIL` / `ADMIN_PASSWORD`: Default admin credentials

### 5. Set up database

```bash
# Start PostgreSQL (if using Docker)
docker-compose up -d db

# Run migrations (when available)
alembic upgrade head

# Or let the app create tables automatically (development only)
```

### 6. Create initial admin user

```bash
python -m app.scripts.init_admin
```

### 7. Start backend server

```bash
# Development
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Or using Python
python -m app.main
```

The backend API will be available at:
- API: http://localhost:8000
- Docs: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Frontend Setup

### 1. Navigate to frontend directory

```bash
cd frontend
```

### 2. Install dependencies

```bash
npm install
# or
pnpm install
# or
yarn install
```

### 3. Configure environment

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Key environment variables:
- `NEXT_PUBLIC_API_URL`: Backend API URL (default: http://localhost:8000)

### 4. Start development server

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

The frontend will be available at http://localhost:3000

## API Endpoints

### Public Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/projects` | List public projects |
| GET | `/api/v1/projects/featured` | Get featured projects |
| GET | `/api/v1/projects/{slug}` | Get project by slug |
| GET | `/api/v1/research` | List public research |
| GET | `/api/v1/research/featured` | Get featured research |
| GET | `/api/v1/research/{slug}` | Get research by slug |
| POST | `/api/v1/audits/request` | Submit audit request |
| GET | `/api/v1/audits/types` | Get audit types |
| POST | `/api/v1/contact/submit` | Submit contact form |
| GET | `/api/v1/contact/types` | Get contact types |
| POST | `/api/v1/metrics/track` | Track analytics event |

### Admin Endpoints (Requires Authentication)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/admin/login` | Admin login |
| GET | `/api/v1/admin/me` | Get current admin |
| GET | `/api/v1/admin/projects` | List all projects |
| POST | `/api/v1/admin/projects` | Create project |
| PUT | `/api/v1/admin/projects/{id}` | Update project |
| DELETE | `/api/v1/admin/projects/{id}` | Delete project |
| GET | `/api/v1/admin/research` | List all research |
| POST | `/api/v1/admin/research` | Create research |
| GET | `/api/v1/admin/audits` | List audit requests |
| PUT | `/api/v1/admin/audits/{id}` | Update audit request |
| GET | `/api/v1/admin/contacts` | List contacts |

## Docker Deployment

### Using Docker Compose

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Individual Services

```bash
# Backend only
docker build -t genjecx-backend ./backend
docker run -p 8000:8000 genjecx-backend

# Frontend only
docker build -t genjecx-frontend ./frontend
docker run -p 3000:3000 genjecx-frontend
```

## Development Workflow

1. **Start backend**: `cd backend && uvicorn app.main:app --reload`
2. **Start frontend**: `cd frontend && npm run dev`
3. **Access API docs**: http://localhost:8000/docs
4. **Access app**: http://localhost:3000

## Testing

### Backend Tests

```bash
cd backend
pytest
```

### Frontend Tests

```bash
cd frontend
npm run test
```

## Production Checklist

- [ ] Change `SECRET_KEY` to a strong random value
- [ ] Change `ADMIN_PASSWORD` to a secure password
- [ ] Set `DEBUG=false` in backend
- [ ] Configure proper `CORS_ORIGINS`
- [ ] Set up SSL/TLS certificates
- [ ] Configure proper database credentials
- [ ] Set up database backups
- [ ] Configure monitoring and logging
- [ ] Set up CDN for static assets

## Architecture

### Backend
- **FastAPI**: Modern Python web framework
- **SQLAlchemy**: ORM for database operations
- **Pydantic**: Data validation and serialization
- **JWT**: Authentication tokens
- **Structlog**: Structured logging

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS
- **Custom API Client**: Type-safe API integration

## License

Copyright © 2024 GenJecX. All rights reserved.
