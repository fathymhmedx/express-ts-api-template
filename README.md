# Node.js Express TypeScript API Template

A clean and modular Node.js API template built with **Express** and **TypeScript**, using **Mongoose**, **i18n**, and structured with modules, containers, and shared utilities.

---

## 🗂 Folder Structure

```
src/
├── app.ts                  # Main Express app
├── server.ts               # Server bootstrap
├── containers/             # DI containers for modules
│   └── users.container.ts
├── locales/                # i18n translation files
│   ├── ar/                 # Arabic translations
│   │   └── translation.json
│   └── en/                 # English translations
│       └── translation.json
├── middlewares/            # Global middlewares
│   ├── error.middleware.ts
│   ├── not-found.middleware.ts
│   └── validate.middleware.ts
├── modules/                # Feature modules
│   └── users/              # Users module
│       ├── dtos/            # Data Transfer Objects
│       │   ├── create-user.dto.ts
│       │   ├── update-user.dto.ts
│       │   └── index.ts
│       ├── users.controller.ts
│       ├── users.model.ts
│       ├── users.repository.ts
│       ├── users.route.ts
│       └── users.service.ts
├── routes/                 # Central route registration
│   └── index.ts
├── shared/                 # Shared utilities and configs
│   ├── config/
│   │   └── database.ts
│   ├── constants/
│   │   └── user-roles.ts
│   ├── error-handlers/
│   │   ├── jwt.error.ts
│   │   ├── mongo.error.ts
│   │   ├── unknown.error.ts
│   │   └── zod.error.ts
│   ├── errors/
│   │   ├── api-error.ts
│   │   └── error-codes.ts
│   ├── i18n/
│   │   └── index.ts
│   ├── repositories/
│   │   └── base.repository.ts
│   └── utils/
│       └── asyncHandler.ts
└── types/
    └── express.d.ts
```

---

## ⚡ Features Implemented

- **Users Module**: Full CRUD with `UsersRepository`, `UsersService`, `UsersController`
- **Mongoose Integration**: BaseRepository for generic operations
- **Custom Async Handler**: `asyncHandler` utility for async controller methods
- **Validation Middleware**: Zod-based validation for body, query, params
- **Error Handling**: Centralized `ApiError` with handlers for Mongo, JWT, Zod, and unknown errors
- **i18n**: Localization support for English (`en`) and Arabic (`ar`)
- **DI Container**: Manual dependency injection per module

---

## 🚧 Modules in Progress

- **Auth Module** (login, registration, JWT, etc.) – coming soon

---

## 📝 Notes

- Use `users.container.ts` to get the initialized UsersController
- All DTOs are under each module in `dtos/` folder
- Shared constants like `USER_ROLES` are in `shared/constants/`

---

## 💻 Usage

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start development server:
   ```bash
   npm run start:dev
   ```
3. API base URL: `http://localhost:PORT/api/v1`

---

## 📄 Conventions

- **Folder per module**: controller, service, repository, dto, route
- **Conventional commits** used for git history
- **Typescript strict mode** enabled
- **i18n**: All user-facing messages go through translation files

