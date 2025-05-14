import { RequestHandler } from "express"
import { PrismaClient } from "@prisma/client"
import { compare, encrypt } from "../utilities/encrypt.util"
import { sendVerificationLink } from "../utilities/email.util"
import { signJwToken } from "../utilities/jwt-util"

const prisma = new PrismaClient()

export const userSignup: RequestHandler = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      res.status(400).send("Email and password are required.")
      return
    }

    const hashedPassword = await encrypt(req.body.password)

    const createdUser = await prisma.users.create({
      data: { email: req.body.email, password: hashedPassword, isVerified: false },
    })

    const isOk = await sendVerificationLink(createdUser.id, req.body.email)

    if (!isOk) {
      res.status(500).send("Failed to send verification email. Please try again later.")
      return
    }

    res.status(201).send("Email sent.")
  } catch (error) {
    res.sendStatus(500)
    console.error(error)
  }
}

export const userSignin: RequestHandler = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      res.status(400).send("Email and password are required.")
      return
    }

    const foundedUser = await prisma.users.findFirst({ where: { email: req.body.email } })

    if (!foundedUser || !(await compare(req.body.password, foundedUser.password))) {
      res.status(401).send("Invalid email or password.")
      return
    }

    if (!foundedUser.isVerified) {
      await sendVerificationLink(foundedUser.id, req.body.email)
      res.status(403).send("Your email is not verified. A new verification link has been sent to your email.")
      return
    }

    res.status(200).send(signJwToken(foundedUser.id))
  } catch (error) {
    res.sendStatus(500)
    console.error(error)
  }
}

export const userVerify: RequestHandler = async (req, res) => {
  try {
    const foundedInfo = await prisma.emailVerification.findFirstOrThrow({ where: { verificationUrl: req.params.uuid } })

    if (Date.now() > foundedInfo.expirationDate.getTime()) {
      res.status(410).send("The verification link has expired. Please request a new one.")
      return
    }

    await prisma.users.update({ data: { isVerified: true }, where: { id: foundedInfo.userId } })

    res.status(200).send("Email verified.")
  } catch (error) {
    res.sendStatus(500)
    console.error(error)
  }
}
