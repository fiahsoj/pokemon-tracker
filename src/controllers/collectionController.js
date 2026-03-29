import {
  getCollection,
  addCardToCollection,
  deleteCardFromCollection,
  getMissingCards
} from "../services/collectionServices.js"
import { getCompletionPercentage } from "../services/setsServices.js"

export function viewCollection(req, res) {
  const userId = req.user.id
  const collection = getCollection(userId)
  res.json(collection)
}

export function addCard(req, res) {
  const userId = req.user.id
  const cardId = req.params.cardId
  const added = addCardToCollection(userId, cardId)

  if (!added) {
    return res.status(400).json({ error: "Card already exists" })
  }

  res.status(201).json({ cardAdded: added })
}

export function removeCard(req, res) {
  const userId = req.user.id
  const cardId = req.params.cardId
  const deleted = deleteCardFromCollection(userId, cardId)

  if (!deleted) {
    return res.status(404).json({ error: "User does not own this card" })
  }

  res.json({ cardDeleted: true })
}

export function getCompletion(req, res) {
  const userId = req.user.id
  const setId = req.params.setId
  const completion = getCompletionPercentage(userId, setId)
  res.json({ completion })
}

export function getMissing(req, res) {
  const userId = req.user.id
  const setId = req.params.setId
  const missing = getMissingCards(userId, setId)
  res.json({ missing })
}