# Node.js Express TypeScript API Template

A **clean, scalable, and production-ready Node.js REST API template** built with **Express** and **TypeScript**.  
Designed using a **feature-based (modular) architecture** with strong validation, centralized error handling, domain-based codes, and full **i18n support (EN / AR)**.

This template focuses on **clean architecture, separation of concerns, and maintainability**, making it suitable for real-world backend applications.

---

## 🚀 Tech Stack

- **Node.js**
- **Express.js**
- **TypeScript**
- **MongoDB + Mongoose**
- **Zod** – schema-based validation
- **JWT** – ready for authentication
- **i18n (i18next)** – English & Arabic
- **Conventional Commits**

---

## 🗂 Project Structure

```
src/
├── app.ts                  # Express app configuration
├── server.ts               # Server bootstrap
│
├── containers/             # Manual dependency injection
│   └── users.container.ts
│
├── locales/                # Localization files
│   ├── ar/
│   │   └── translation.json
│   └── en/
│       └── translation.json
│
├── middlewares/            # Global middlewares
│   ├── error.middleware.ts
│   ├── not-found.middleware.ts
│   └── validate.middleware.ts
│
├── modules/                # Feature-based application modules
│   └── users/
│       ├── dtos/           # Zod DTO schemas
│       │   ├── create-user.dto.ts
│       │   ├── update-user.dto.ts
│       │   ├── user-id-param.dto.ts
│       │   ├── user-email-param.dto.ts
│       │   └── index.ts
│       ├── users.codes.ts  # Domain-specific success & error codes
│       ├── users.controller.ts
│       ├── users.model.ts
│       ├── users.repository.ts
│       ├── users.route.ts
│       └── users.service.ts
│
├── routes/                 # Central route registration
│   └── index.ts
│
├── shared/                 # Shared & reusable logic
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
│   │   ├── api-error.ts    # Generic ApiError with structured metadata
│   │   └── error-codes.ts  # Global error codes
│   ├── i18n/
│   │   └── index.ts
│   ├── repositories/
│   │   └── base.repository.ts
│   └── utils/
│       ├── asyncHandler.ts
│       └── translate.ts
│
└── types/
    └── express.d.ts        # Express type augmentation
```

---

## ✅ Implemented Features

### 🧩 Modular Architecture
- Feature-based modules (`users`, `auth`, etc.)
- Clear separation: **Controller → Service → Repository**
- Controllers never access models directly

### 🧪 Validation
- Zod schemas for:
  - Request body
  - Route params (`id`, `email`, etc.)
  - Query params
- Generic validation middleware
- Structured field-level validation errors

### ❌ Centralized Error Handling
- Unified `ApiError` abstraction
- Automatic handling for:
  - MongoDB errors
  - Zod validation errors
  - JWT errors
  - Unknown errors
- Consistent and predictable error response format

### 🌍 Internationalization (i18n)
- English & Arabic support
- All user-facing messages go through i18n
- Field-level validation messages are translated automatically

### 📦 Users Module
- Full CRUD operations
- Request params validation (`id`, `email`)
- Domain-specific success & error codes
- Clean, translated API responses

### 🧠 Base Repository
- Generic reusable Mongoose repository
- Reduces duplication across modules

### 🔌 Dependency Injection
- Manual DI via containers
- Easy to test, extend, and refactor

---

## 🚧 Upcoming Modules

- **Auth Module**
  - Register / Login
  - JWT Access & Refresh Tokens
  - Role-based authorization (RBAC)

---

## 📝 Development Guidelines

- DTOs live inside each module under `dtos/`
- Separate DTOs for:
  - body
  - params
  - query
- Controllers must not access models directly
- Business logic lives in services
- Errors must be thrown using `ApiError`
- All responses and errors must be translatable

---

## ▶️ Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run development server
```bash
npm run start:dev
```

### 3. Run in production
```bash
npm run build
npm run start:prod
```

### 4. API Base URL
```
http://localhost:<PORT>/api/v1
```

---

## 📦 Git Conventions

This project follows **Conventional Commits**:

- `feat:` New feature
- `fix:` Bug fix
- `refactor:` Code refactoring (no behavior change)
- `chore:` Tooling, config, or docs

---

## 📄 License

This project is open-source and free to use as a **starter template for scalable Node.js APIs**.

---

### 👑 Note
The template is production-ready and can be used as:
- A starting point for a company project
- An open-source boilerplate
- Reference architecture for Node.js + TypeScript APIs

