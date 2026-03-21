import express from "express"
import {
  getSets,
  getSet,
  collectCards
} from "../controllers/setsController.js"
import { addCardToCollection, getCompletionPercentage, getMissingCards } from "../services/setsServices.js"
import { validateUser } from "../middleware/validateUser.js"
import {validateCard} from "../middleware/validateCard.js"

const router = express.Router()

router.get("/", getSets)

router.get("/:name", getSet)

router.post("/:name/collect", collectCards)

app.get("/users/:userId/sets/:setId/completion", (req, res) => {
  const userId = req.user.id
  const setId = Number(req.params.setId)
  const completion = getCompletionPercentage(userId,setId)

  res.json({
    completion: completion
  })
})

app.get("/users/:userId/sets/:setId/missing", validateUser, (req, res) => {
  const userId = req.user.id
  const setId = Number(req.params.setId)
  const missingCards = getMissingCards(userId,setId)

  res.json({
    missing: missingCards
  })
})

app.post("/users/:userId/cards", validateUser, validateCard, (req,res) => {
  const userId = req.user.id
  const cardId = Number(req.body.cardId)

  const addedCard = addCardToCollection(userId,cardId)

  res.json({
    cardAdded: addedCard
  })
})

app.delete("/users/cards/:cardId", validateUser, (req,res) => {
  const userId = req.user.id
  const cardId = Number(req.params.cardId)

  const deleteCard = deleteCardFromCollection(userId,cardId)

  if(deleteCard){
    return res.status(404).json({
      error: "User does not own this card"
    })
  }

  res.json({
    cardDeleted: deleteCard
  })
})

export default router