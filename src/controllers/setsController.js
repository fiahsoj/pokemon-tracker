import {
  getAllSets,
  getSetByName,
  getSetProgress
} from "../services/setsServices.js"

export function getSets(req, res) {
  res.json(getAllSets())
}

export function getSet(req, res) {
  const set = getSetByName(req.params.name)

  if (!set) {
    return res.status(404).json({ error: "Set not found" })
  }

  res.json(set)
}

export function getSetProgressController(req,res){
  const userId = req.user.id
  const setId = Number(req.params.setId)

  const progress = getSetProgress(userId, setId)

  res.json({
    success: true,
    progress
  })
}