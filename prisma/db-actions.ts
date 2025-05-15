import db from "./db"

export const insertIntoUser = async (email: string, password: string) =>
  db.users.create({ data: { email, password, isVerified: false } })

export const findUserByEmail = async (email: string) => db.users.findFirst({ where: { email } })

export const insertIntoVC = async (expirationDate: Date, verificationUrl: string, userId: string) =>
  db.emailVerification.create({ data: { expirationDate, verificationUrl, userId } })

export const findVerificationUrl = async (verificationUrl: string) =>
  db.emailVerification.findFirst({ where: { verificationUrl } })

export const updateUserToVerifyById = (id: string) => db.users.update({ data: { isVerified: true }, where: { id } })

export const insertIntoImage = (imgSrc: string, userId: string) => db.images.create({ data: { imgSrc, userId } })

export const findImagesByUserId = (userId: string) => db.images.findMany({ where: { userId } })
