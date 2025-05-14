import type { RequestHandler } from "express"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const imageUpload: RequestHandler = async (req, res) => {
  try {
    const imageFile = req.files.image
    // @ts-ignore
    const base64Data = imageFile.data.toString("base64")
    const image = `data:image/png;base64,${base64Data}`

    await prisma.images.create({ data: { imgSrc: image, userId: req.body.userId } })

    res.status(201).send("Image uploaded successfully.")
  } catch (error) {
    res.sendStatus(500)
    console.error(error)
  }
}

export const imageGet: RequestHandler = async (req, res) => {
  try {
    const imagesByUser = await prisma.images.findMany({ where: { userId: req.body.userId } })

    res.status(200).json(imagesByUser)
  } catch (error) {
    res.sendStatus(500)
    console.error(error)
  }
}
