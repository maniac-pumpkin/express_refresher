import { json, urlencoded } from "express"
import fileUpload from "express-fileupload"
import compression from "compression"
import helmet from "helmet"
import morgan from "morgan"
import cors from "cors"

const middlewares = [
  morgan("dev"),
  helmet(),
  compression(),
  json(),
  urlencoded({ extended: true }),
  cors(),
  fileUpload(),
]

export default middlewares
