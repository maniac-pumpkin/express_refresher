import { findUserByEmail, findVerificationUrl, insertIntoUser, updateUserToVerifyById } from "@prisma/db-actions"
import { sendVerificationLink } from "@utilities/email.util"
import { compare, encrypt, signJwToken } from "@utilities/encrypt.util"
import type { Request, Response } from "express"

export async function userSignup(req: Request, res: Response) {
  try {
    const hashedPassword = await encrypt(req.body.password)

    const createdUser = await insertIntoUser(req.body.email, hashedPassword)

    const isOk = await sendVerificationLink(createdUser.id, req.body.email)

    if (!isOk) {
      res.status(500).send("Failed to send verification email.")
      return
    }

    res.status(201).send("Email sent.")
  } catch (error) {
    res.sendStatus(500)
    console.error(error)
  }
}

export async function userSignin(req: Request, res: Response) {
  try {
    const foundedUser = await findUserByEmail(req.body.email)

    if (!foundedUser || !(await compare(req.body.password, foundedUser.password))) {
      res.status(401).send("Invalid email or password.")
      return
    }

    if (!foundedUser.isVerified) {
      await sendVerificationLink(foundedUser.id, req.body.email)
      res.status(403).send("Your email is not verified. A new verification link has been sent.")
      return
    }

    const token = signJwToken(foundedUser.id)

    res.status(200).send(token)
  } catch (error) {
    res.sendStatus(500)
    console.error(error)
  }
}

export async function userVerify(req: Request, res: Response) {
  try {
    const foundedInfo = await findVerificationUrl(req.params.uuid)

    if (Date.now() > foundedInfo.expirationDate.getTime()) {
      res.status(410).send("The verification link has expired.")
      return
    }

    await updateUserToVerifyById(foundedInfo.userId)

    res.status(200).send("Email verified.")
  } catch (error) {
    res.sendStatus(500)
    console.error(error)
  }
}
