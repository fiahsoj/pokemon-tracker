import collections from "../data/collections.js"
import { cards } from "../data/cards.js"
import db from "../data/db.js"
import { response } from "express"

export function getCollection(userId){
   return collections.filter(collection => collection.userId === userId)
}   

export function addCardToCollection(userId, cardId){
  const existingCard = collections.find(item => item.userId === userId && item.cardId === cardId)

  if(existingCard){
    return null
  }

  return new Promise((resolve, reject) => {

    db.get(
      "SELECT * FROM collections WHERE userId = ? AND cardId = ?",
      [userId,cardId],  
      (err,row)=>{
        if(err){
          return reject(err)
        }
        if(row){
          return resolve(null)
        }
      }
    )

    db.run(
      "INSERT INTO collections (userId, cardId) VALUES (?, ?)",
      [userId, cardId],
      function(err){

        if(err){
          return reject(err)
        }

        resolve({
          userId,
          cardId
        })

      }
    )

  })
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