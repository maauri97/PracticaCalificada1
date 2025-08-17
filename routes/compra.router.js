import express from "express";
import * as ccompra from "../controllers/compras.controller.js";

const router = express.Router();

// Rutas de compras
router.post("/add", ccompra.createCompra);       // Crear compra
router.get("/", ccompra.getAllCompras);          // Obtener todas las compras
router.get("/:id", ccompra.getCompraById);       // Obtener compra por ID
router.patch("/:id", ccompra.updateCompra);      // Editar compra
router.delete("/:id", ccompra.deleteCompra);     // Eliminar compra

export default router;
