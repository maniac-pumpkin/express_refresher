import express from "express"

const server = express()

server.get("/", (_, res) => {
  res.setHeader("Content-Type", "text/plain")
  res.send("Hello testing............ \n")
})

server.get("/mmd", (_, res) => {
  res.setHeader("Content-Type", "text/plain")
  res.send("Sup mmd \n")
})

const PORT = process.env["PORT"]

server.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))
