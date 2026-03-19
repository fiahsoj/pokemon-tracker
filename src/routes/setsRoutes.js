import express from "express"
import {
  getSets,
  getSet,
  collectCards
} from "../controllers/setsController.js"
import { getCompletionPercentage, getMissingCards } from "../services/setsServices.js"

const router = express.Router()

router.get("/", getSets)

router.get("/:name", getSet)

router.post("/:name/collect", collectCards)

app.get("/users/:userId/sets/:setId/completion", (req, res) => {
  const userId = Number(req.params.userId)
  const setId = Number(req.params.setId)
  const completion = getCompletionPercentage(userId,setId)

  res.json({
    completion: completion
  })
})

app.get("/users/:userId/sets/:setId/missing", (req, res) => {
  const userId = Number(req.params.userId)
  const setId = Number(req.params.setId)
  const missingCards = getMissingCards(userId,setId)

  res.json({
    missing: missingCards
  })
})


export default router