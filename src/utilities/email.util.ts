import { insertIntoVC } from "@prisma/db-actions"
import crypto from "node:crypto"
import nodemailer from "nodemailer"

const EMAIL_USERNAME = process.env["EMAIL_USERNAME"]
const EMAIL_PASSWORD = process.env["EMAIL_PASSWORD"]

const transporter = nodemailer.createTransport({
  host: "smtp.mail.yahoo.com",
  port: 587,
  service: "yahoo",
  secure: true,
  auth: {
    user: EMAIL_USERNAME,
    pass: EMAIL_PASSWORD,
  },
})

export const sendMail = async (client: string, subject: string, text: string) => {
  try {
    await transporter.sendMail({
      from: `"Email verification" <${EMAIL_USERNAME}>`,
      to: client,
      subject,
      text,
    })
  } catch (err) {
    console.error(err)
  }
}

export const sendVerificationLink = async (userId: string, email: string) => {
  try {
    const expirationDate = new Date()
    expirationDate.setMinutes(expirationDate.getMinutes() + 10)

    const generatedUUID = crypto.randomUUID()

    await insertIntoVC(expirationDate, generatedUUID, userId)

    await sendMail(
      email,
      "Verification code",
      `${process.env["BASE_URL"]}:${process.env["PORT"]}/user/verify/${generatedUUID}`,
    )

    return true
  } catch (error) {
    console.error(error)
    return false
  }
}
