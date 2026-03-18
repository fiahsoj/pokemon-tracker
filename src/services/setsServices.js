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

export function getCompletionPercentage(name){
    const set = getSetByName(name)

    if (!set) return null

    const totalCards = set.totalCards

    const ownedCards = userCards[name] || []

    const ownedCount = ownedCards.length

    const percentage = (ownedCount/totalCards) * 100

    return percentage
}