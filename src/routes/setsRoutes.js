import express from "express"
import {
  getSets,
  getSet,
  collectCards
} from "../controllers/setsController.js"
import { getCompletionPercentage } from "../services/setsServices.js"

const router = express.Router()

router.get("/", getSets)

router.get("/:name", getSet)

router.post("/:name/collect", collectCards)

router.post("/:name/completion", getCompletionPercentage)

export default router