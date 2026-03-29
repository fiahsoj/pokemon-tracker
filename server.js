import express from "express"

import setsRoutes from "./src/routes/setsRoutes.js"
import collectionRoutes from "./src/routes/collectionRoutes.js"

const app = express()

app.use(express.json())

// Routes
app.use("/sets", setsRoutes)
app.use("/users", collectionRoutes)

const PORT = 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})