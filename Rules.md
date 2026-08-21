# Om Ganesh Sanskrutik Mandal
## Development Rules

---

# 1. General Rules

The project must follow the architecture defined in Architecture.md.

Do not introduce a new technology without explaining why it is
necessary.

Do not replace the existing technology stack without approval.

Do not rewrite working code unnecessarily.

Do not create duplicate components when an existing reusable component
can be used.

---

# 2. Frontend Rules

Use:

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- React Router

Do not use:

- jQuery
- Bootstrap
- Material UI
- unnecessary UI frameworks

Use TypeScript instead of JavaScript for React components.

Use reusable components.

Avoid extremely large components.

A component should have a clear responsibility.

---

# 3. Styling Rules

Use Tailwind CSS for styling.

Avoid creating custom CSS unless necessary.

Do not use inline style attributes unless there is a specific reason.

Maintain consistent:

- spacing
- typography
- colors
- border radius
- shadows
- responsive behavior

Follow Design.md.

Do not introduce arbitrary colors without checking the design system.

---

# 4. Backend Rules

Use:

- Node.js
- Express
- TypeScript
- MySQL

Use REST APIs.

Separate:

Routes
Controllers
Services
Database logic

Do not put all backend logic inside server.ts.

---

# 5. Database Rules

Use MySQL.

Database credentials must never be committed to Git.

Use environment variables.

Never expose:

DB_HOST
DB_USER
DB_PASSWORD

to the frontend.

Use migrations/schema files where appropriate.

---

# 6. Security Rules

Passwords must never be stored as plain text.

Use bcrypt for password hashing.

Use JWT for authentication.

Validate all user input.

Never trust data received from the client.

Protected operations must require authentication.

Never expose secrets in frontend code.

---

# 7. API Rules

Use appropriate HTTP methods.

GET
    Read data.

POST
    Create data.

PUT/PATCH
    Update data.

DELETE
    Delete data.

Return appropriate HTTP status codes.

Return consistent JSON responses.

---

# 8. Error Handling

Errors must be handled gracefully.

The backend must not expose sensitive internal errors to users.

Development logs may contain detailed errors.

Production responses should contain safe error messages.

Frontend should display useful user-friendly messages.

---

# 9. Component Rules

Prefer reusable components.

Examples:

Button
Card
Modal
Input
EventCard
GalleryCard
SectionTitle

Do not duplicate identical UI code.

---

# 10. File Rules

Use clear and descriptive names.

React components:

PascalCase

Example:

EventCard.tsx

Utilities:

camelCase

Example:

formatDate.ts

---

# 11. Git Rules

Use meaningful commit messages.

Examples:

feat: add event cards

feat: add event API

fix: correct event date formatting

style: improve mobile navbar

refactor: simplify event service

docs: update architecture

Do not commit:

.env

node_modules/

build files

secrets

API keys

---

# 12. AI Coding Rules

Before modifying code:

1. Understand the existing architecture.
2. Check relevant documentation files.
3. Inspect the existing implementation.
4. Make the smallest necessary change.

Do not:

- invent existing files
- invent existing APIs
- invent database fields
- remove working functionality
- rewrite unrelated files
- change architecture without approval

If something is unclear, state the assumption before implementing it.

After making changes, explain:

- What changed
- Which files changed
- Why they changed
- How to test the change

---

# 13. Documentation Rules

Keep the following documents updated:

PRD.md
Architecture.md
Rules.md
Phases.md
Design.md
Memory.md

Memory.md should be updated after significant development work.

---

# 14. Testing Rules

New functionality should be tested before moving to the next phase.

Do not mark a phase complete if the feature is not working.

---

# 15. Scope Rules

Do not implement future features before their planned phase.

Avoid unnecessary features.

Focus on completing the current phase.
