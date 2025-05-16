import express from "express"
import middlewares from "./middleware"
import imageRoute from "./routes/image.route"
import userRoute from "./routes/user.route"

const server = express()

server.use(middlewares)
server.get("/", (_, res) => {
  res.send(
    "They loud and obnoxious, they like music that rhymes, they're 13% of population and commit half of the crimes. Who are they?",
  )
})
server.use("/user", userRoute)
server.use("/image", imageRoute)
server.use((_, res) => {
  res.status(404).send("Route not found.")
})

const PORT = process.env["PORT"]
const BASE_URL = process.env["BASE_URL"]

server.listen(PORT, () => console.log(`Server is running on ${BASE_URL}:${PORT}`))
