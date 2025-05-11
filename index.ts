import express from "express"

const server = express()

server.get("/", (_, res) => {
  res.send("Hello")
})

server.get("/mmd", (_, res) => {
  res.send("Hello Mmd")
})

const PORT = 80

server.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))
