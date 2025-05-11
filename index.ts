import express from "express"

const server = express()

server.get("/", (_, res) => {
  res.setHeader("Content-Type", "text/plain")
  res.send("Hello \n")
})

server.get("/mmd", (_, res) => {
  res.setHeader("Content-Type", "text/plain")
  res.send("Hello Mmd \n")
})

const PORT = 80

server.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))
