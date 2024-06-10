import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const admin = (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ error: "No se proporcionó un token" });
    }

    const decodedToken = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    req.userId = decodedToken.id;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido" });
  }
};

export const requireAuth = (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ error: "No se proporcionó un token" });
    }

    const decodedToken = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    req.userId = decodedToken.id;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido" });
  }
};