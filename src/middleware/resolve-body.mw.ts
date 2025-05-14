import { RequestHandler } from "express"

const resolveBody: RequestHandler = (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password) {
      res.status(400).send("Email and password are required.")
      return
    }

    next()
  } catch (error) {
    res.sendStatus(500)
    console.error(error)
  }
}

export default resolveBody
