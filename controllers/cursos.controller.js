import pool from "../config/db.js";
import { GET_ALL_COURSES, GET_COURSE_BY_ID, INSERT_COURSE, DELETE_COURSE } from "../services/cursos.services.js";

// Devolver todos los cursos
export const getAllCourses = async (req, res) => {
    try {
        const [rows] = await pool.query(GET_ALL_COURSES);
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error al obtener todos los cursos:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Devolver un curso específico
export const getCourseById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query(GET_COURSE_BY_ID, [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: "Curso no encontrado" });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error("Error al obtener el curso:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Añadir un curso a la BD
export const createCourse = async (req, res) => {
    const { coursename, id_categ, id_level, price } = req.body;

    // Validación de campos entrantes
    if (!coursename || !id_categ || !id_level || price == null) {
        return res.status(400).json({ error: "Faltan campos requeridos" });
    }

    try {

        // Insert
        const [result] = await pool.query(INSERT_COURSE, [
            coursename,
            id_categ,
            id_level,
            price,
        ]);
        res.status(201).json({
            message: "Curso creado exitosamente",
            id_course: result.insertId,
        });

    } catch (error) {
        console.error("Error al crear el curso:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Actualizar la data de un curso
export const updateCourse = async (req, res) => {
    const { id } = req.params;
    const { coursename, id_categ, id_level, price } = req.body;

    // Construir dinámicamente el SET del UPDATE para la BD
    const fields = [];
    const values = [];
    if (coursename !== undefined) {
        fields.push("coursename = ?");
        values.push(coursename);
    }
    if (id_categ !== undefined) {
        fields.push("id_categ = ?");
        values.push(id_categ);
    }
    if (id_level !== undefined) {
        fields.push("id_level = ?");
        values.push(id_level);
    }
    if (price !== undefined) {
        fields.push("price = ?");
        values.push(price);
    }
    if (fields.length === 0) {
        return res.status(400).json({ error: "No se enviaron campos para actualizar" });
    }
    values.push(id); // para el WHERE al final

    // Consulta
    const query = `
        UPDATE courses
        SET ${fields.join(", ")}
        WHERE id_course = ?;
    `;

    try {

        // Ejecución de consulta
        const [result] = await pool.query(query, values);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Curso no encontrado" });
        }

        res.status(200).json({ message: "Curso actualizado exitosamente" });
    } catch (error) {
        console.error("Error al actualizar el curso:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Eliminar un curso
export const deleteCourse = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query(DELETE_COURSE, [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Curso no encontrado" });
        }
        res.status(200).json({ message: "Curso eliminado exitosamente" });
    } catch (error) {
        console.error("Error al eliminar el curso:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};
