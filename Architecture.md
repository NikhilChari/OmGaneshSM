# Om Ganesh Sanskrutik Mandal
## System Architecture

---

# 1. Architecture Overview

The application will use a full-stack architecture.

Frontend:

React + TypeScript + Vite + Tailwind CSS

Backend:

Node.js + Express.js + TypeScript

Database:

MySQL

Architecture:

Frontend
    ↓
REST API
    ↓
Express Backend
    ↓
MySQL Database

---

# 2. Frontend Architecture

The frontend will use React components.

Main areas:

- Pages
- Components
- Layouts
- Admin pages
- Services
- Types
- Hooks
- Utilities

---

# 3. Frontend Structure

frontend/

src/

components/
    Reusable UI components.

pages/
    Public website pages.

admin/
    Admin dashboard pages.

layouts/
    Public and admin layouts.

services/
    API communication.

types/
    TypeScript interfaces and types.

hooks/
    Reusable React hooks.

lib/
    Utility functions.

assets/
    Images and static assets.

---

# 4. Backend Architecture

The backend will follow a layered architecture.

Routes
    ↓
Controllers
    ↓
Services
    ↓
Database

Routes define API endpoints.

Controllers handle HTTP requests.

Services contain business logic.

Database models/data-access code communicate with MySQL.

---

# 5. Backend Structure

backend/src/

config/
    Database configuration.

controllers/
    Request handling.

middleware/
    Authentication, validation and error handling.

models/
    Database-related logic.

routes/
    API routes.

services/
    Business logic.

utils/
    Helper functions.

server.ts
    Application entry point.

---

# 6. Database

The database will use MySQL.

Initial tables:

- users
- events
- registrations
- members
- gallery
- news
- volunteers
- contact_messages

---

# 7. API Structure

/api

/auth
/events
/registrations
/members
/gallery
/news
/volunteers
/contact

---

# 8. Public Routes

/

 /about

/events

/events/:id

/gallery

/membership

/contact

---

# 9. Admin Routes

/admin

/admin/events

/admin/gallery

/admin/members

/admin/registrations

/admin/news

/admin/volunteers

/admin/messages

---

# 10. Data Flow

Example:

User opens Events page.

React requests:

GET /api/events

Express receives request.

Controller processes request.

Service retrieves event data.

MySQL returns data.

Express sends JSON response.

React renders event cards.

---

# 11. Authentication

Admin authentication will use:

JWT + bcrypt.

Protected admin APIs will require authentication.

---

# 12. Deployment

Frontend:

Vercel

Backend:

Suitable Node.js hosting platform.

Database:

Managed MySQL database.

---

# 13. Design Principle

The frontend should never directly communicate with MySQL.

Correct:

React
↓
API
↓
Backend
↓
MySQL

Incorrect:

React
↓
MySQL