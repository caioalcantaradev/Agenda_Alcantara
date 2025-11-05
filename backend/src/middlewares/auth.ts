import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config";

export type AuthUser = {
  id: string;
  email: string;
  name: string;
};

declare module "express-serve-static-core" {
  interface Request {
    user?: AuthUser;
  }
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ message: "Não autenticado" });
  try {
    const decoded = jwt.verify(token, config.jwtSecret) as AuthUser & {
      iat: number;
      exp: number;
    };
    req.user = { id: decoded.id, email: decoded.email, name: decoded.name };
    next();
  } catch {
    return res.status(401).json({ message: "Token inválido" });
  }
}

