# Nexus Admin

AI-Native Admin & Content Control Plane for an AI Chat Platform.

## Project Goal

Build a production-grade, responsive SaaS admin platform for managing an AI chat product. The frontend is built with the latest stable Next.js, TypeScript, and Tailwind CSS. The backend is Python-based and exposes APIs consumed by the frontend.

The platform must support normal administration plus AI-assisted generation, moderation, quality scoring, analytics, content optimization, and an Admin Copilot.

## Source of Truth

The client proposal is the primary product-scope reference:

- 18 admin modules
- AI automation across content, moderation, prompts, analytics, CMS, notifications, and support
- Human approval workflows
- Configurable AI autonomy
- Audit logging
- PostgreSQL with row-level security
- Responsive enterprise SaaS UI
- Indicative delivery plan: 14 weeks

Do not invent product requirements that conflict with the proposal.

## Technology

### Frontend

- Latest stable Next.js (16.x)
- TypeScript (strict mode)
- Tailwind CSS (v4)
- React Server Components where appropriate
- File-based App Router
- Responsive desktop/tablet/mobile UI
- Reusable component architecture
- API integration with Python backend

### Backend

- Python
- FastAPI
- Pydantic
- Uvicorn
- SQLAlchemy
- PostgreSQL

## Setup Instructions

### Prerequisites

- Node.js 18+
- Python 3.11+
- PostgreSQL 14+

### Frontend Setup

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

The frontend will be available at http://localhost:3000.

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
uvicorn main:app --reload
```

The backend API will be available at http://localhost:8000.

## Architecture

### Frontend Structure

```
frontend/src/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   ├── register/
│   │   ├── forgot-password/
│   │   └── reset-password/
│   └── (admin)/
│       ├── dashboard/
│       ├── chats/
│       ├── episodes/
│       ├── story-flows/
│       ├── prompts/
│       ├── conversations/
│       ├── users/
│       ├── roles/
│       ├── permissions/
│       ├── taxonomy/
│       ├── cms/
│       ├── notifications/
│       ├── audit-logs/
│       ├── analytics/
│       ├── moderation/
│       ├── media/
│       ├── settings/
│       └── copilot/
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── textarea.tsx
│   │   ├── select.tsx
│   │   ├── checkbox.tsx
│   │   ├── radio.tsx
│   │   ├── switch.tsx
│   │   ├── badge.tsx
│   │   ├── card.tsx
│   │   ├── table.tsx
│   │   ├── tabs.tsx
│   │   ├── modal.tsx
│   │   ├── drawer.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── tooltip.tsx
│   │   ├── toast.tsx
│   │   ├── pagination.tsx
│   │   ├── breadcrumb.tsx
│   │   ├── confirm-dialog.tsx
│   │   ├── scroll-area.tsx
│   │   └── avatar.tsx
│   ├── layout/
│   │   ├── admin-shell.tsx
│   │   ├── sidebar.tsx
│   │   └── topbar.tsx
│   └── providers/
│       ├── providers.tsx
│       └── query-provider.tsx
├── features/
│   ├── dashboard/
│   ├── chats/
│   ├── episodes/
│   ├── story-flows/
│   ├── prompts/
│   ├── conversations/
│   ├── users/
│   ├── roles/
│   ├── permissions/
│   ├── taxonomy/
│   ├── cms/
│   ├── notifications/
│   ├── audit-logs/
│   ├── analytics/
│   ├── moderation/
│   ├── media/
│   ├── settings/
│   └── copilot/
├── lib/
│   ├── api/
│   │   ├── client.ts
│   │   ├── auth.ts
│   │   ├── chats.ts
│   │   ├── episodes.ts
│   │   ├── story-flows.ts
│   │   ├── prompts.ts
│   │   ├── conversations.ts
│   │   ├── users.ts
│   │   ├── analytics.ts
│   │   ├── moderation.ts
│   │   ├── media.ts
│   │   └── copilot.ts
│   ├── auth/
│   │   ├── auth-context.tsx
│   │   └── provider.tsx
│   └── utils.ts
├── hooks/
├── types/
│   └── index.ts
└── config/
    ├── site.ts
    └── env.ts
```

### Backend Structure

```
backend/
├── main.py
├── requirements.txt
├── .env.example
└── app/
    ├── api/
    │   └── v1/
    │       ├── __init__.py
    │       ├── auth.py
    │       ├── chats.py
    │       ├── episodes.py
    │       ├── story_flows.py
    │       ├── prompts.py
    │       ├── conversations.py
    │       ├── users.py
    │       ├── analytics.py
    │       ├── moderation.py
    │       ├── media.py
    │       └── copilot.py
    ├── core/
    │   ├── __init__.py
    │   ├── config.py
    │   ├── database.py
    │   └── security.py
    ├── models/
    │   └── __init__.py
    ├── schemas/
    │   ├── __init__.py
    │   ├── user.py
    │   ├── character.py
    │   ├── episode.py
    │   ├── story_flow.py
    │   ├── prompt.py
    │   ├── conversation.py
    │   ├── moderation.py
    │   └── media.py
    ├── services/
    │   ├── __init__.py
    │   └── ai_service.py
    └── repositories/
        ├── __init__.py
        └── base.py
```

## Design System

- Dark-first theme with semantic design tokens
- Primary: `hsl(260 84% 60%)`
- Surface backgrounds with subtle borders
- AI-specific accent color for AI-native features
- Responsive from 360px mobile to ultra-wide

## API Conventions

- All API calls go through `src/lib/api/client.ts`
- Environment variable `NEXT_PUBLIC_API_URL` configures the backend URL
- Typed request/response models in `src/types/index.ts`
- Backend routes are prefixed with `/api/v1`

## Current Implementation Status

### Completed

- [x] Repository setup with frontend and backend directories
- [x] Next.js 16 + TypeScript + Tailwind CSS v4 frontend
- [x] Python FastAPI backend skeleton with CORS and health endpoint
- [x] Design system tokens and global CSS
- [x] Reusable UI component library (Button, Input, Textarea, Select, Checkbox, Radio, Switch, Badge, Card, Table, Tabs, Modal, Drawer, Dropdown, Tooltip, Toast, Pagination, Breadcrumb, ConfirmDialog, ScrollArea, Avatar, Empty/Loading/Error states)
- [x] Admin shell layout (Sidebar, Topbar, responsive shell)
- [x] Authentication UI (Login page with form validation)
- [x] Dashboard with KPI cards, charts, activity feed, system health, quick actions
- [x] Chats/Characters module (list, search, filter, create/edit drawer, AI generation)
- [x] Episodes module (list, status, ordering, AI generation)
- [x] Story Flows module (React Flow visual editor)
- [x] Prompts module (list, editor, version history, A/B variants, AI improvement)
- [x] Conversations module (list, flags, escalation, quality scoring)
- [x] Users module (directory, profile, status, suspend/ban)
- [x] Roles module (catalogue, descriptions, assignment)
- [x] Permissions module (matrix by module/action)
- [x] Genres & Tags module (CRUD, search, usage count)
- [x] CMS Pages module (rich content, SEO, publishing workflow)
- [x] Notifications module (broadcast, targeted, scheduling)
- [x] Audit Logs module (immutable history with AI metadata)
- [x] Analytics module (engagement, retention, content performance, exports)
- [x] Moderation module (unified queue, review/approve/block)
- [x] Media Library module (upload, asset grid, search)
- [x] Settings module (profile, security, appearance, organisation, platform, AI configuration)
- [x] Admin Copilot (chat interface)
- [x] Typed API client modules for all features
- [x] Mock data isolated from presentation components
- [x] Responsive design across breakpoints
- [x] Loading/error/empty/permission states
- [x] Build, lint, and typecheck passing

### In Progress

- [ ] Real backend database integration
- [ ] Backend AI service implementation
- [ ] Backend authentication with JWT
- [ ] Real API integration replacing mock data

## Development Commands

```bash
# Frontend
cd frontend
npm run dev      # Start dev server
npm run build    # Production build
npm run lint     # Run ESLint
npm run start    # Start production server

# Backend
cd backend
uvicorn main:app --reload  # Start dev server
```

## Important Notes

- Do not stop after scaffolding. The implementation includes actual working UI screens.
- Mock data is used temporarily through clearly isolated mock layers.
- The application is runnable after every meaningful change.
- All AI logic is orchestrated through backend APIs only.
- Never expose AI provider secret keys or database credentials in the frontend.
