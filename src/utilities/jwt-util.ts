import jsonwebtoken from "jsonwebtoken"

const JWT_SECRET_KEY = process.env["JWT_SECRET_KEY"]

export const signJwToken = (userId: string) =>
  jsonwebtoken.sign({ userId }, JWT_SECRET_KEY, { expiresIn: "24h", algorithm: "RS256" })

export const verifyJwToken = (token: string) => jsonwebtoken.verify(token, JWT_SECRET_KEY)
