import express from "express"
import middlewares from "./middleware"

import userRoute from "./routes/user.route"
import imageRoute from "./routes/image.route"

const server = express()

server.use(middlewares)
server.use("/user", userRoute)
server.use("/image", imageRoute)
server.use((_, res) => {
  res.status(404).send("Not Found")
})

const PORT = process.env["PORT"]
const BASE_URL = process.env["BASE_URL"]

server.listen(PORT, () => console.log(`Server is running on ${BASE_URL}:${PORT}`))
