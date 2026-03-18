import express from "express"
import setsRoutes from "./src/routes/setsRoutes.js"

const app = express()

app.use(express.json())

app.use("/sets", setsRoutes)

app.listen(3000, () => {
  console.log("Server running on port 3000")
})