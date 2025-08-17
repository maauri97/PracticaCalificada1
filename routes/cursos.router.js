import express from "express";
import * as ccursos from "../controllers/cursos.controller.js";

const router = express.Router();

// Rutas de cursos

/**
 * @swagger
 * tags:
 *   name: Cursos
 *   description: Operaciones CRUD relacionadas a cursos
 */


/**
 * @swagger
 * /cursos:
 *   get:
 *     summary: Obtener todos los cursos
 *     tags: [Cursos]
 *     responses:
 *       200:
 *         description: Lista de cursos
 */
router.get("/", ccursos.getAllCourses);


/**
 * @swagger
 * /cursos/{id}:
 *   get:
 *     summary: Obtener curso por ID
 *     tags: [Cursos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del curso
 *     responses:
 *       200:
 *         description: Devuelve los datos de un curso específico
 */
router.get("/:id", ccursos.getCourseById);


/**
 * @swagger
 * /cursos/add:
 *   post:
 *     summary: Crear un nuevo curso
 *     tags: [Cursos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - coursename
 *               - id_categ
 *               - id_level
 *               - price
 *             properties:
 *               coursename:
 *                 type: string
 *               id_categ:
 *                 type: integer
 *               id_level:
 *                 type: integer
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Curso creado exitosamente
 *       400:
 *         description: Datos inválidos o incompletos
 */
router.post("/add", ccursos.createCourse);


/**
 * @swagger
 * /cursos/{id}:
 *   patch:
 *     summary: Actualizar algún campo de un curso existente. Es necesario recibir, al menos, un campo a actualizar.
 *     tags: [Cursos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del curso a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               coursename:
 *                 type: string
 *               id_categ:
 *                 type: integer
 *               id_level:
 *                 type: integer
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Curso actualizado exitosamente
 *       404:
 *         description: Curso no encontrado
 */
router.patch("/:id", ccursos.updateCourse);


/**
 * @swagger
 * /cursos/{id}:
 *   delete:
 *     summary: Eliminar un curso
 *     tags: [Cursos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del curso a eliminar
 *     responses:
 *       200:
 *         description: Curso eliminado exitosamente
 *       404:
 *         description: Curso no encontrado
 */
router.delete("/:id", ccursos.deleteCourse);

export default router;
