import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { config } from "./config";

export type AuthUser = {
  id: string;
  email: string;
  name: string;
};

export function getAuthUser(request: NextRequest): AuthUser | null {
  const auth = request.headers.get("authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret) as AuthUser & {
      iat: number;
      exp: number;
    };
    return {
      id: decoded.id,
      email: decoded.email,
      name: decoded.name,
    };
  } catch {
    return null;
  }
}

export function requireAuth(request: NextRequest): AuthUser {
  const user = getAuthUser(request);
  if (!user) {
    throw new Error("Não autenticado");
  }
  return user;
}
