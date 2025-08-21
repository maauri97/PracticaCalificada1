import pool from "../config/db.js";
import {
  serv_getAllUsers,
  serv_getUserById,
  serv_createUser
} from "../services/usuarios.services.js";

// Autentificar usuario
export const authenticateUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  try {
    const [rows] = await pool.query(GET_USER_BY_ID, [email]);
    if (rows.length === 0 || rows[0].password !== password) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    res.status(200).json({ message: "Autenticación exitosa", user: rows[0] });
  } catch (error) {
    console.error("Error al autenticar usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Bloquear usuario
export const blockUser = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query(BLOCK_USER, [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.status(200).json({ message: "Usuario bloqueado exitosamente" });
  } catch (error) {
    console.error("Error al bloquear usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Desbloquear usuario
export const unblockUser = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query(UNBLOCK_USER, [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.status(200).json({ message: "Usuario desbloqueado exitosamente" });
  } catch (error) {
    console.error("Error al desbloquear usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}; 
