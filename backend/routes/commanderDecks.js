import express from "express";
import { getCommanderDecks, createCommanderDeck } from "../controllers/commanderDecks.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

//READ
router.get("/:userId/commanderDecks", verifyToken, getCommanderDecks);

//CREATE
router.post("/:useId/create", verifyToken, createCommanderDeck);

export default router;