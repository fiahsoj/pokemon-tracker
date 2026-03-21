import {cards} from ".../data/cards.js"

export function validateCard(req, res, next){
    const cardId = Number(req.body.cardId)

    const cardExists = cards.find(card => card.id === cardId)

    if(!cardExists){
        return res.status(404).json({
            error: "Card does not exist"
        })
    }
    
    next()
}   