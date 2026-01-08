# Node.js Express TypeScript API Template

A clean, scalable, and modular **Node.js REST API template** built with **Express** and **TypeScript**.  
Designed using a **feature-based (modular) architecture**, with centralized error handling, validation, i18n, and clean separation of concerns.

---

## 🚀 Tech Stack

- **Node.js**
- **Express.js**
- **TypeScript**
- **MongoDB + Mongoose**
- **Zod** (validation)
- **JWT** (ready for auth module)
- **i18n** (English / Arabic)
- **Conventional Commits**

---

## 🗂 Project Structure

```
src/
├── app.ts                  # Express app configuration
├── server.ts               # Server bootstrap
│
├── containers/             # Dependency Injection containers
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
├── modules/                # Application modules (feature-based)
│   └── users/
│       ├── dtos/           # Data Transfer Objects
│       │   ├── create-user.dto.ts
│       │   ├── update-user.dto.ts
│       │   └── index.ts
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
│   │   ├── api-error.ts
│   │   └── error-codes.ts
│   ├── i18n/
│   │   └── index.ts
│   ├── repositories/
│   │   └── base.repository.ts
│   └── utils/
│       └── asyncHandler.ts
│
└── types/
    └── express.d.ts        # Express type augmentation
```

---

## ✅ Implemented Features

- **Users Module**
  - CRUD operations
  - Repository → Service → Controller pattern
  - Zod DTO validation
- **Base Repository**
  - Generic reusable Mongoose repository
- **Centralized Error Handling**
  - MongoDB errors
  - Zod validation errors
  - JWT errors
  - Unknown errors
- **Custom ApiError class**
- **Async Handler**
  - Clean async controllers without try/catch
- **Internationalization (i18n)**
  - English & Arabic translations
- **Manual Dependency Injection**
  - Clean containers per module

---

## 🚧 Upcoming Modules

- **Auth Module**
  - Register / Login
  - JWT Access & Refresh Tokens
  - Role-based authorization

---

## 📝 Development Notes

- All DTOs live inside each module under `dtos/`
- Shared constants are placed in `shared/constants`
- Controllers should never access models directly
- All user-facing messages go through i18n

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

### 3. Run in Production
```bash
npm run build      # Compile TypeScript to JavaScript
npm run start:prod       # Start the compiled server

```

### 4. API Base URL
```
http://localhost:<PORT>/api/v1
```

---

## 📦 Git Conventions

- **Conventional Commits**
  - `feat:` new feature
  - `fix:` bug fix
  - `refactor:` code refactor
  - `chore:` tooling / config
- Feature-based folder structure
- Strict TypeScript enabled

---

## 📄 License

This project is open-source and free to use as a starter template.
