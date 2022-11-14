import jwt from "jsonwebtoken";
import logger from "../../utils/logger";
const JWT_SECRET = process.env.JWT_SECRET || "secret";
const EXPIRES_IN = process.env.EXPIRES_IN || "7d";
export function signjwt(payload: string | Buffer | object) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: EXPIRES_IN,
  });
}

export function verify(token: string) {
  try {
    const decodes = jwt.verify(token, JWT_SECRET);
    logger.info("heres the verified token:", decodes);
    return decodes;
  } catch (e) {
    return null;
  }
}
