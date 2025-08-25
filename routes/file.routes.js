import _express from "express";
import * as cfile from "../controllers/file.controller.js";
import * as mauth from "../middleware/auth.middleware.js";

const router = _express.Router();

router.post('/upload', mauth.authMiddleware(), cfile.uploadProductImage);

export default router;