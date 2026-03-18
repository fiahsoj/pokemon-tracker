import {
  getAllSets,
  getSetByName,
  updateCollected
} from "../services/setsService.js"

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

export function collectCards(req, res) {
  const collected = req.body.collected

  const set = updateCollected(req.params.name, collected)

  if (!set) {
    return res.status(404).json({ error: "Set not found" })
  }

  res.json(set)
}