import compression from "compression"
import cors from "cors"
import { json, urlencoded } from "express"
import fileUpload from "express-fileupload"
import helmet from "helmet"
import morgan from "morgan"

const middlewares = [
  morgan("dev"),
  helmet(),
  compression(),
  json(),
  urlencoded({ extended: true }),
  cors(),
  fileUpload({
    limits: { fileSize: 200 * 1024 },
    abortOnLimit: true,
    safeFileNames: true,
    preserveExtension: true,
    limitHandler: (_, res) => {
      res.status(413).send("File size exceeds 200KB limit")
    },
  }),
]

export default middlewares
