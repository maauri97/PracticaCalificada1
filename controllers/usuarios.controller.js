import pool from "../config/db.js";
import { GET_ALL_USERS, GET_USER_BY_ID, INSERT_USER, DELETE_USER } from "../services/usuarios.services.js"

// Devolver todos los usuarios
export const getAllUsers = async (req, res) => {
    try {
        const [rows] = await pool.query(GET_ALL_USERS);
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error al obtener todos los usuarios:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Devolver un usuario específico
export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query(GET_USER_BY_ID, [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error("Error al obtener usuario:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Añadir un usuario
export const createUser = async (req, res) => {
    const { username, password, first_name, last_name, email } = req.body;

    // Validación de campos entrantes
    if (!username || !password || !first_name || !last_name || !email) {
        return res.status(400).json({ error: "Faltan campos requeridos" });
    }

    try {

        // Insert
        const [result] = await pool.query(INSERT_USER, [
            username,
            password,
            first_name,
            last_name,
            email
        ]);
        res.status(201).json({
            message: "Usuario creado exitosamente",
            id_course: result.insertId,
        });

    } catch (error) {
        console.error("Error al crear un usuario:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Actualizar la data de un usuario
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, password, first_name, last_name, email } = req.body;

    // Construir dinámicamente el SET del UPDATE para la BD
    const fields = [];
    const values = [];
    if (username !== undefined) {
        fields.push("username = ?");
        values.push(username);
    }
    if (password !== undefined) {
        fields.push("password = ?");
        values.push(password);
    }
    if (first_name !== undefined) {
        fields.push("first_name = ?");
        values.push(first_name);
    }
    if (last_name !== undefined) {
        fields.push("last_name = ?");
        values.push(last_name);
    }
    if (email !== undefined) {
        fields.push("email = ?");
        values.push(email);
    }
    if (fields.length === 0) {
        return res.status(400).json({ error: "No se enviaron campos para actualizar" });
    }
    values.push(id); // para el WHERE al final

    // Consulta
    const query = `
        UPDATE users
        SET ${fields.join(", ")}
        WHERE id_user = ?;
    `;

    try {

        // Ejecución de consulta
        const [result] = await pool.query(query, values);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        res.status(200).json({ message: "Usuario actualizado exitosamente" });
    } catch (error) {
        console.error("Error al actualizar un usuario:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Eliminar un usuario
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query(DELETE_USER, [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.status(200).json({ message: "Usuario eliminado exitosamente" });
    } catch (error) {
        console.error("Error al eliminar el usuario:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};
