import fs from "fs";
import * as sproducts from "../services/products.services.js";
/* import * as sfile from "../services/file.service.js"; */

export const getAll = async function (req, res) {
  console.log("------------products.controller/getAll------------");
  try {
    const productos = await sproducts.getAll(); 
    console.log("... despues de sproducts.getAll()");
    res.json(productos || []);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error obteniendo registros" });
  }
};

export const create = async function (req, res) {
  try {
    const product = req.body
    /* console.log(req.user) */
    let idproduct = await sproducts.create(product);
    console.log(idproduct);
    res.json({'idProduct': idproduct});

  } catch (error){
    console.error(error);
    res.status(500).json({ error: "Error generando registros" });
  }
}

export const getById = async function (req, res) {
  console.log("req.params.id: " + req.params.id);
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: "id inválido" });

    const producto = await sproducts.getById(id);
    console.log("... despues de sproducts.getById()");
    if (!producto) return res.status(404).json({ error: "Producto no encontrado" });
    res.json(producto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error obteniendo registros" });
  }
};

/* export const getById = async function (req, res) {
    try {
        let product = await 
    } catch(error){
        console.log('Error', error);
    }
} */