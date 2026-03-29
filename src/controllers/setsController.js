import {
  getAllSets,
  getSetByName
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