import { Router, Request, Response } from "express";
import User from "../models/User";
import {
  getAuthUrl,
  getTokens,
  getUserInfo,
  generateJWT,
} from "../utils/googleAuth";

const router = Router();

// Iniciar processo de autenticação Google
router.get("/google", (req: Request, res: Response) => {
  try {
    const authUrl = getAuthUrl();
    res.json({ authUrl });
  } catch (error) {
    res.status(500).json({ message: "Erro ao gerar URL de autenticação" });
  }
});

// Callback do Google OAuth
router.post("/google/callback", async (req: Request, res: Response) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res
        .status(400)
        .json({ message: "Código de autorização necessário" });
    }

    // Obter tokens do Google
    const tokens = await getTokens(code);

    // Obter informações do usuário
    const userInfo = await getUserInfo(tokens.access_token!);

    // Verificar se usuário já existe
    let user = await User.findOne({ googleId: userInfo.id });

    if (user) {
      // Atualizar tokens
      user.accessToken = tokens.access_token!;
      if (tokens.refresh_token) {
        user.refreshToken = tokens.refresh_token;
      }
      await user.save();
    } else {
      // Criar novo usuário
      user = new User({
        googleId: userInfo.id!,
        email: userInfo.email!,
        name: userInfo.name!,
        picture: userInfo.picture,
        accessToken: tokens.access_token!,
        refreshToken: tokens.refresh_token || undefined,
      });
      await user.save();
    }

    // Gerar JWT
    const jwtToken = generateJWT((user._id as any).toString());

    res.json({
      token: jwtToken,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        picture: user.picture,
      },
    });
  } catch (error) {
    console.error("Erro no callback do Google:", error);
    res.status(500).json({ message: "Erro na autenticação" });
  }
});

// Obter usuário autenticado
router.get("/me", async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token de acesso necessário" });
    }

    const jwt = require("jsonwebtoken");
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: "Usuário não encontrado" });
    }

    res.json({
      id: user._id,
      email: user.email,
      name: user.name,
      picture: user.picture,
    });
  } catch (error) {
    res.status(403).json({ message: "Token inválido" });
  }
});

export default router;
