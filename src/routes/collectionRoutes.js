import express from "express"
import { 
  viewCollection, 
  addCard, 
  removeCard, 
  getCompletion, 
  getMissing 
} from "../controllers/collectionController.js"
import { validateUser } from "../middleware/validateUser.js"
import { validateCard } from "../middleware/validateCard.js"

const router = express.Router()

// GET /users/:userId/collection → get all cards for a user
router.get("/:userId/collection", validateUser, viewCollection)

// POST /users/:userId/collection/:cardId → add card
router.post("/:userId/collection/:cardId", validateUser, validateCard, addCard)

// DELETE /users/:userId/collection/:cardId → remove card
router.delete("/:userId/collection/:cardId", validateUser, removeCard)

// GET /users/:userId/sets/:setId/completion → get completion %
router.get("/:userId/sets/:setId/completion", validateUser, getCompletion)

// GET /users/:userId/sets/:setId/missing → get missing cards
router.get("/:userId/sets/:setId/missing", validateUser, getMissing)

export default router