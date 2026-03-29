import collections from "../data/collections.js"
import { cards } from "../data/cards.js"

export function getCollection(userId){
    const userCollection = collections.filter(collection => collection.userId === userId)

    if(!userCollection){
        return null
    }
    
    return userCollection.map(collection => collection.cardId)
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
  const index = collections.findIndex(item => item.userId === userId && item.cardId === cardId)

  if (index === -1){
    return null
  }

  collections.splice(index, 1)

  return true
}

export function getMissingCards(userId,setId){
  const cardsInSet = cards.filter(card => card.setId === setId)
  const userCards = collections.filter(item => item.userId === userId)

  const missingCards = cardsInSet.filter(card => {
    return !userCards.some(item => item.cardId === card.id)
  })
  return missingCards.map(card => card.name)
}