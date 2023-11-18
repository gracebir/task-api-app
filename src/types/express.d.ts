import { PrismaUser } from '@prisma/client'; // Import your Prisma User model

declare module 'express-serve-static-core' {
  interface Request {
    token?: string;
    user?: PrismaUser;
  }
}