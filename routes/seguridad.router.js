import express from "express";
import * as cseguridad from "../controllers/seguridad.controller.js";
import * as mauth from "../middleware/auth.middleware.js";

const router = express.Router();

// Rutas de seguridad
router.post("/login", cseguridad.authenticateUser);
router.patch("/block-account/:id", mauth.authMiddleware(), cseguridad.blockUser);
router.patch("/unblock-account/:id", mauth.authMiddleware(), cseguridad.unblockUser);
export default router;
