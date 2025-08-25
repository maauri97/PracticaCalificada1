import _express from "express";
import * as cuser from "../controllers/usuarios.controller.js";
import * as mauth from "../middleware/auth.middleware.js";

const router = _express.Router();

router.get('/', mauth.authMiddleware(), cuser.getAllUsers);
router.post('/', mauth.authMiddleware(), cuser.createUser);
router.get('/:id', mauth.authMiddleware(), cuser.getUserById);
router.put('/:id', mauth.authMiddleware(), cuser.updateUser);
router.delete('/:id', mauth.authMiddleware(), cuser.deleteUser);

export default router;
