import express from "express"
import {
  getSets,
  getSet,
  collectCards
} from "../controllers/setsController.js"

const router = express.Router()

router.get("/", getSets)

router.get("/:name", getSet)

router.post("/:name/collect", collectCards)

export default router