import express from "express"
import middlewares from "./middleware"
import imageRoute from "./routes/image.route"
import userRoute from "./routes/user.route"

const server = express()

server.use(middlewares)
server.use("/user", userRoute)
server.use("/image", imageRoute)
server.use((_, res) => {
  res.status(404).send("Route not found.")
})

const PORT = process.env["PORT"]
const BASE_URL = process.env["BASE_URL"]

server.listen(PORT, () => console.log(`Server is running on ${BASE_URL}:${PORT}`))
