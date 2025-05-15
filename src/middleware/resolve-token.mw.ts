import { verifyJwToken } from "@utilities/encrypt.util"
import { RequestHandler } from "express"

const resolveToken: RequestHandler = (req, res, next) => {
  try {
    const authToken = req.headers.authorization

    if (!authToken) {
      res.status(401).send("Authorization token is missing")
      return
    }

    const { userId } = verifyJwToken(authToken) as { userId: string; iat: number; exp: number }

    req.body = { ...req.body, userId }

    next()
  } catch (error) {
    res.sendStatus(500)
    console.error(error)
  }
}

export default resolveToken
