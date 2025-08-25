import express from "express";
import rcursos from "./routes/cursos.router.js";
import rusuarios from "./routes/usuarios.router.js";
import rcompras from "./routes/compra.router.js";
import rseguridad from "./routes/seguridad.router.js";
import rproducts from "./routes/products.router.js";
import rfile from "./routes/file.routes.js";
const router = express.Router();

// Rutas generales
router.use("/cursos", rcursos);
router.use("/users", rusuarios);
router.use("/compras", rcompras);
router.use("/products", rproducts);
router.use("/archives", rfile);
router.use("/seguridad", rseguridad);

export default router;
