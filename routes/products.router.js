import _express from "express";
import * as cproduct from "../controllers/products.controller.js";

const router = _express.Router();

router.get('/', cproduct.getAll);
router.post('/', cproduct.create);

export default router;