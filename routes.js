import express from "express";
import rcursos from "./routes/cursos.router.js";
import rusuarios from "./routes/usuarios.router.js";
import rcompras from "./routes/compra.router.js";
import rseguridad from "./routes/seguridad.router.js";
import rproducts from "./routes/products.router.js";
const router = express.Router();

// Rutas generales
router.use("/cursos", rcursos);
router.use("/usuarios", rusuarios);
router.use("/compras", rcompras);
router.use("/products", rproducts);

export default router;
