import collections from "../data/collections.js"
import { sets } from "../data/sets.js"
import { cards } from "../data/cards.js"
import { getMissingCards } from "./collectionServices.js"

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
  const ownedCardSet = new Set(ownedCardsIds)

  let ownedCount = 0

  for (const card of cardsInSet){
    if (ownedCardSet.has(card.id)) {
      ownedCount++
    }
  }
  const completionPercentage = (ownedCount / cardsInSet.length) * 100
  const roundedPercentage = Number(completionPercentage.toFixed(2))

  return roundedPercentage
}

export function getSetProgress(userId,setId){
  const cardsInSet = cards.filter(card => card.setId === setId)
  const userCards = collections.filter(card => card.userId === userId)
  const ownedCards = cardsInSet.filter(card => userCards.some(item => item.cardId === card.id))
  
  const totalCards = cardsInSet.length
  const ownedCardsCount = ownedCards.length
  const missingCards = totalCards - ownedCardsCount
  const completion = Number(((ownedCardsCount / totalCards) * 100).toFixed(2))
  

  const setProgress = {
    totalCards,
    ownedCardsCount,
    missingCards,
    completion
  }

  return setProgress
}

