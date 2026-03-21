import { users } from "../data/users.js"

export function validateUser(req, res, next){

  const userId = Number(req.params.userId)

  const user = users.find(u => u.id === userId)

  if(!user){
    return res.status(404).json({
      error: "User not found"
    })
  }
  
  req.user = user

  next()
}