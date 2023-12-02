// src/custom.d.ts
import { Request } from 'express';

interface Session {
    userId: string;
    iat: number;
    exp: number;
}


declare module 'express' {
  interface Request {
    session?: Session;
  }
}
