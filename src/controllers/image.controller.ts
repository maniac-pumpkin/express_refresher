import { findImagesByUserId, insertIntoImage } from "@prisma/db-actions"
import type { Request, Response } from "express"

export async function imageUpload(req: Request, res: Response) {
  try {
    const imageFile = req.files.image
    // @ts-ignore
    const base64Data = imageFile.data.toString("base64")
    const image = `data:image/png;base64,${base64Data}`

    await insertIntoImage(image, req.body.userId)

    res.status(201).send("Image uploaded successfully.")
  } catch (error) {
    res.sendStatus(500)
    console.error(error)
  }
}

export async function imageGet(req: Request, res: Response) {
  try {
    const imagesByUser = await findImagesByUserId(req.body.userId)

    res.status(200).json(imagesByUser)
  } catch (error) {
    res.sendStatus(500)
    console.error(error)
  }
}
