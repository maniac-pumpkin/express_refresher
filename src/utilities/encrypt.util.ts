import bcrypt from "bcrypt"
import jsonwebtoken from "jsonwebtoken"

const JWT_SECRET_KEY = process.env["JWT_SECRET_KEY"]

export const encrypt = async (txt: string) => bcrypt.hash(txt, 8)

export const compare = async (txt: string, encryptedTxt: string) => bcrypt.compare(txt, encryptedTxt)

export const signJwToken = (userId: string) => jsonwebtoken.sign({ userId }, JWT_SECRET_KEY, { expiresIn: "24h" })

export const verifyJwToken = (token: string) => jsonwebtoken.verify(token, JWT_SECRET_KEY)
