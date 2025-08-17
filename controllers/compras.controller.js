import pool from "../config/db.js";
import {
  GET_ALL_PURCHASES,
  GET_PURCHASE_BY_ID,
  INSERT_PURCHASE,
  DELETE_PURCHASE,
} from "../services/compras.services.js";

// Devolver todas las compras
export const getAllCompras = async (req, res) => {
  try {
    const [rows] = await pool.query(GET_ALL_PURCHASES);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error al obtener compras:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Devolver una compra en específico
export const getCompraById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(GET_PURCHASE_BY_ID, [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Compra no encontrada" });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Añadir una compra a la BD
export const createCompra = async (req, res) => {
  const { id_user, id_course, id_discount } = req.body;

  if (!id_user || !id_course) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  try {
    const [result] = await pool.query(INSERT_PURCHASE, [
      id_user,
      id_course,
      id_discount || null,
    ]);

    res.status(201).json({
      message: "Compra registrada exitosamente",
      id_purchase: result.insertId,
    });
  } catch (error) {
    console.error("Error al registrar compra:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
// Actualizar la data de una compra
export const updateCompra = async (req, res) => {
  try {
    // Ejecución de consulta
    const [result] = await pool.query(UPDATE_PURCHASE);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Compra no encontrada" });
    }

    res.status(200).json({ message: "Compra actualizada exitosamente" });
  } catch (error) {
    console.error("Error al actualizar una compra:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Eliminar una compra
export const deleteCompra = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query(DELETE_PURCHASE, [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Compra no encontrada" });
    }
    res.status(200).json({ message: "Compra eliminada exitosamente" });
  } catch (error) {
    console.error("Error al eliminar la compra:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
