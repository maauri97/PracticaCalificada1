import express from "express";
import * as cseguridad from "../controllers/seguridad.controller.js";

const router = express.Router();

// Rutas de seguridad
router.post("/login", cseguridad.authenticateUser);
router.patch("/block-account/:id", cseguridad.blockUser);
router.patch("/unblock-account/:id", cseguridad.unblockUser);
export default router;
