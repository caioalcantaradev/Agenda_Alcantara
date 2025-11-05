import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { config } from "../config.js";
import { requireAuth } from "../middlewares/auth.js";

export const authRouter = Router();

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body as { email?: string; password?: string };
  if (!email || !password)
    return res.status(400).json({ message: "Email e senha são obrigatórios" });

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) return res.status(401).json({ message: "Credenciais inválidas" });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ message: "Credenciais inválidas" });

  const token = jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    config.jwtSecret,
    { expiresIn: "7d" }
  );
  return res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      mustChangePassword: user.mustChangePassword,
    },
  });
});

authRouter.get("/me", requireAuth, async (req, res) => {
  const user = await User.findById(req.user!.id).lean();
  if (!user) return res.status(401).json({ message: "Não autenticado" });
  return res.json({
    user: {
      id: String(user._id),
      email: user.email,
      name: user.name,
      mustChangePassword: user.mustChangePassword,
    },
  });
});

authRouter.post("/change-password", requireAuth, async (req, res) => {
  const { currentPassword, newPassword } = req.body as {
    currentPassword?: string;
    newPassword?: string;
  };
  if (!newPassword)
    return res.status(400).json({ message: "Nova senha é obrigatória" });
  const user = await User.findById(req.user!.id);
  if (!user) return res.status(401).json({ message: "Não autenticado" });
  if (user.mustChangePassword) {
    // no primeiro acesso, currentPassword pode ser omitida
  } else {
    if (!currentPassword)
      return res.status(400).json({ message: "Senha atual é obrigatória" });
    const ok = await (
      await import("bcryptjs")
    ).default.compare(currentPassword, user.passwordHash);
    if (!ok) return res.status(401).json({ message: "Senha atual incorreta" });
  }
  const bcrypt = (await import("bcryptjs")).default;
  user.passwordHash = await bcrypt.hash(newPassword, 10);
  user.mustChangePassword = false;
  await user.save();
  return res.json({ ok: true });
});
