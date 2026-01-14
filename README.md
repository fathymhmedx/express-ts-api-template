# Express TypeScript API Template

A **clean, scalable, and production-ready Node.js REST API template** built with **Express** and **TypeScript**, designed to be **database-agnostic** and easy to extend.
Supports modular architecture, strong validation, DI with `tsyringe`, i18n, and ready for real-world applications.

---

## Table of Contents

1. [Features](#features)
2. [Architecture Overview](#architecture-overview)
3. [Folder Structure](#folder-structure)
4. [Database-Agnostic Repositories](#database-agnostic-repositories)
5. [Dependency Injection (tsyringe)](#dependency-injection-tsyringe)
6. [Switching Databases](#switching-databases)
7. [Usage](#usage)
8. [Line Endings](#line-endings)
9. [Git Conventions](#git-conventions)
10. [Contributing](#contributing)
11. [License](#license)
12. [Note](#note)
13. [Contact](#contact)

---

## Features

- Node.js + Express + TypeScript
- Database-agnostic architecture (MongoDB, Prisma, Sequelize)
- Clean architecture (Domain / Infrastructure / Application / Controller)
- Strong validation using **Zod**
- JWT-ready authentication
- i18n support (English / Arabic)
- ESLint + Prettier + lint-staged + Husky
- DI with `tsyringe` for clean dependency injection
- Modular, feature-based structure
- Ready for production

---

## Architecture Overview

```
src/
├── modules/
│   └── users/
│       ├── contracts/            # DB-agnostic repository interfaces
│       │   └── users.repository.ts
│       ├── dtos/                 # DTOs for requests
│       ├── users.model.ts
│       ├── users.service.ts
│       ├── users.controller.ts
│       └── users.routes.ts
│
├── infrastructure/
│   └── database/
│       ├── mongo/                # MongoDB implementation
│       │   ├── base.repository.ts
│       │   └── users.repository.ts
│       ├── prisma/               # Prisma implementation (optional)
│       │   ├── base.repository.ts
│       │   └── users.repository.ts
│
├── shared/
│   ├── container/                # tsyringe DI setup
│   │   ├── index.ts              # entry for reflect-metadata & register
│   │   └── register.ts           # DI bindings
│   ├── contracts/                # BaseRepository, other interfaces
│   ├── errors/                   # APIError, error codes
│   └── utils/                    # Helper functions
│
├── middlewares/
└── app.ts
```

---

## Database-Agnostic Repositories

1. **Contracts (Domain-level, DB-agnostic)**

```ts
// modules/users/contracts/users.repository.ts
import { BaseRepository } from '../../../shared/contracts/base.repository';
import { User } from '../users.model';

export interface UsersRepository extends BaseRepository<User> {
  findByEmail(email: string): Promise<User | null>;
}
```

2. **Infrastructure (DB-specific implementation)**

- **MongoDB:**

```
infrastructure/database/mongo/base.repository.ts
infrastructure/database/mongo/users.repository.ts
```

- **Prisma (optional):**

```
infrastructure/database/prisma/base.repository.ts
infrastructure/database/prisma/users.repository.ts
```

3. **Service Layer (Application)**

```ts
import { inject, injectable } from 'tsyringe';
import { UsersRepository } from './contracts/users.repository';
import { TOKENS } from '../../shared/container/tokens';

@injectable()
export class UsersService {
  constructor(
    @inject(TOKENS.UsersRepository)
    private readonly usersRepository: UsersRepository,
  ) {}
}
```

4. **Controller Layer**

- Resolves service via DI
- Handles HTTP requests and responses only

---

## Dependency Injection (tsyringe)

- `shared/container/tokens.ts` → defines symbols for DI
- `shared/container/register.ts` → registers implementations

```ts
import { container } from 'tsyringe';
import { UsersRepository } from '../../infrastructure/database/mongo/users.repository';
import { UsersService } from '../../modules/users/users.service';
import { TOKENS } from './tokens';

container.registerSingleton(TOKENS.UsersRepository, UsersRepository);
container.registerSingleton(TOKENS.UsersService, UsersService);
```

---

## Switching Databases

- Only change **implementation in `infrastructure/database/<db>`**
- Update DI registration in `register.ts`
- No change required in **Services, Controllers, or Routes**

Example:

```ts
// Mongo
container.registerSingleton(TOKENS.UsersRepository, MongoUsersRepository);

// Prisma
container.registerSingleton(TOKENS.UsersRepository, PrismaUsersRepository);
```

---

## Usage

1. Clone the repo
2. Set your `.env` file
3. Choose database implementation in `register.ts`
4. Run:

```bash
pnpm install
pnpm dev
```

5. Access endpoints via `/api/v1/users`

---

## Line Endings

- `.gitattributes` ensures LF endings cross-platform
- Avoids `CRLF` vs `LF` warnings

---

## Linting & Formatting

```bash
pnpm run lint   # Check linting
pnpm run format # Auto-format code
```

- Works automatically with any commit thanks to **lint-staged** + **Husky pre-commit hooks**

---

## Git Conventions

This project follows **Conventional Commits**:

- `feat:` New feature
- `fix:` Bug fix
- `refactor:` Code refactoring (no behavior change)
- `chore:` Tooling, config, or docs

---

## Contributing

- Follow clean architecture
- Add new modules under `modules/`
- Create contract interfaces first
- Implement DB-specific repository in `infrastructure/database/<db>/`
- Register DI bindings in `shared/container/register.ts`

---

## License

MIT

---

### Note

This template is production-ready and can be used as:

- A starting point for a company project
- An open-source boilerplate
- Reference architecture for Node.js Express + TypeScript APIs
- ESLint, Prettier, lint-staged, Husky, and .gitattributes are already configured for clean and consistent code

---

### Contact

For questions or support, reach out:

- **Author:** Fathy Mohamed
- **Email:** [fathymhmed11@gmail.com](mailto:fathymhmed11@gmail.com)
- **GitHub:** [https://github.com/fathymhmedx](https://github.com/fathymhmedx)
