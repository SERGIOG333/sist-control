import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verifyApiToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Missing token" });

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);

    // Verificamos que sea un token de tipo api
    if (decoded.type !== "api") {
      return res.status(403).json({ error: "Access denied: API users only" });
    }

    req.apiUser = decoded; // Guardamos los datos del api user en la request
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
