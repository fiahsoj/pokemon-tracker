import { collectCards } from "../controllers/setsController.js"
import collections from "../data/collections.js"
import { sets } from "../data/sets.js"

export function getAllSets() {
  return sets
}

export function getSetByName(name) {
  return sets.find(
    set => set.name.toLowerCase() === name.toLowerCase()
  )
}

export function updateCollected(name, collected) {
  const set = getSetByName(name)

  if (!set) return null

  set.collected = collected

  return set
}

export function getCompletionPercentage(userId,setId){
  const userCards = collections.filter(item => item.userId === userId)
  const cardsInSet = cards.filter(card => card.setId === setId)
  const ownedCardsIds = userCards.map(item => item.cardId)
  const ownedCardSet = new Set(ownedCardIds)

  let ownedCount = 0

  for (const card of cardsInSet){
    if (ownedCardSet.has(cardsInSet)) {
      ownedCount++
    }
  }
  const completionPercentage = (ownedCount / cardsInSet.length) * 100
  const roundedPercentage = Number(completionPercentage.toFixed(2))

  return completionPercentage
}

export function getMissingCards(userId,setId){
  const cardsInSet = cards.filter(card => card.setId === setId)
  const userCards = collections.filter(item => item.userId === userId)

  const missingCards = cardsInSet.filter(card => {
    return !userCards.some(item => item.cardId === card.id)
  })
  return missingCards.map(card => card.name)
}

export function addCardToCollection(userId, cardId){
  const existingCard = collections.find(item => item.userId === userId && item.cardId === cardId)

  if(existingCard){
    return null
  }

  const newCard = ({
    userId,
    cardId
  })

  collections.push(newCard)

  return newCard
}

export function deleteCardFromCollection(userId,cardId){
  const existingCard = collections.find(item =>
  item.userId === userId &&
  item.cardId === cardId)
  
  if(!existingCard){
    return null
  }

  collections = collections.filter(item => !(item.userId === userId && item.cardId === cardId))
  return true
}