import _express from "express";
import * as cproduct from "../controllers/products.controller.js";
import * as mauth from "../middleware/auth.middleware.js";

const router = _express.Router();

router.get('/', mauth.authMiddleware(), cproduct.getAll);
router.post('/', mauth.authMiddleware(), cproduct.create);
router.get('/:id', mauth.authMiddleware(), cproduct.getById);
router.put('/:id', mauth.authMiddleware(), cproduct.update);
router.delete('/:id', mauth.authMiddleware(), cproduct.deletes);
router.get('/download/:id', mauth.authMiddleware(), cproduct.downloadImage);


export default router;