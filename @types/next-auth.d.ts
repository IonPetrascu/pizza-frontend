import { DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

// Определяем тип для роли (замени на свой, если есть конкретные роли)
type UserRole = "USER" | "ADMIN" | string; // Укажи свои роли, если они фиксированы

declare module "next-auth" {
  // Расширяем интерфейс Session
  interface Session {
    user: {
      id: string; // ID как строка
      name?: string | null; // Имя может быть null
      email?: string | null; // Email может быть null
      role: UserRole; // Роль пользователя
      token?: string; // Токен от бэкенда
    };
  }

  // Расширяем интерфейс User
  interface User extends DefaultUser {
    id: string; // ID как строка
    name?: string; // Имя (опционально, как в authorize)
    email?: string; // Email (опционально, как в authorize)
    role: UserRole; // Роль пользователя
    token?: string; // Токен от бэкенда
  }
}

declare module "next-auth/jwt" {
  // Расширяем интерфейс JWT
  interface JWT extends DefaultJWT {
    id: string; // ID как строка
    role: UserRole; // Роль пользователя
    token?: string; // Токен от бэкенда
  }
}
