import jwt from "jsonwebtoken";

export function createToken(payload, secret, expiresIn) {
  return jwt.sign(payload, secret, { expiresIn });
}
