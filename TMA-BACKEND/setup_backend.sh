#!/bin/bash

# Створення головної директорії
mkdir -p src/api/routes
mkdir -p src/controllers
mkdir -p src/services
mkdir -p src/middlewares
mkdir -p src/config
mkdir -p src/utils
mkdir -p src/prisma

# Створення порожніх файлів
touch src/api/server.ts
touch src/api/db.ts
touch src/api/routes/auth.ts
touch src/api/routes/flights.ts
touch src/api/routes/users.ts
touch src/controllers/authController.ts
touch src/controllers/flightController.ts
touch src/controllers/userController.ts
touch src/services/authService.ts
touch src/services/flightService.ts
touch src/services/userService.ts
touch src/middlewares/authMiddleware.ts
touch src/config/env.ts
touch src/config/constants.ts
touch src/utils/logger.ts
touch src/prisma/schema.prisma
touch src/index.ts

# Створення основних конфігураційних файлів
touch .env
touch package.json
touch tsconfig.json
touch README.md

# Виведення повідомлення про успішне створення структури
echo "✅ Структура бекенду для TMA успішно створена!"
