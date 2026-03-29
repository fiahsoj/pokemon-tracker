import express from "express"
import { getSets, getSet } from "../controllers/setsController.js"

const router = express.Router()

// GET /sets → all sets
router.get("/", getSets)

// GET /sets/:name → get set by name
router.get("/:name", getSet)

export default router