import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verifyWebToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Missing token" });

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);

    // Verificamos que sea un token de tipo web
    if (decoded.type !== "web") {
      return res.status(403).json({ error: "Access denied: Web users only" });
    }

    req.user = decoded; // Guardamos los datos del usuario en la request
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
