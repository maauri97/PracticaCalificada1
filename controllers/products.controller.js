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
    res.json(idproduct);

  } catch (error){
    console.error(error);
    res.status(500).json({ "error": "Error generando registros." });
  }
}

export const update = async function(req, res) {
  try {
    // Falta validar si el producto existe
      const product = req.body;
      let updatedProduct = await sproducts.update(req.params.id, product);
      console.log('UP: ', updatedProduct);
      res.status(200).json({ message: "Producto actualizado."});
  } catch (error){
      console.error(error);
      res.status(500).json({ "error": "Error actualizando registros." });
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
    res.status(500).json({ "error": "Error obteniendo registros" });
  }
};

export const deletes = async function (req, res) {
  try {
    // Falta Validar si existe el producto
      await sproducts.deletes(req.params.id);
      res.status(200).json({ message: "Producto eliminado."});
  } catch(error){
        console.error(error);
    res.status(500).json({ "error": "Error eliminando registros" });
  }
}

export const downloadImage = async function(req, res) {
  console.log('Product Controller Download Image');
  console.log('Params: ', req.params.id);
  try{
    let rutaArchivo = await sproducts.downloadImage(req.params.id);
    if(fs.existsSync(rutaArchivo)) {
      res.download(rutaArchivo, 'imagen.png', (err) => {
        if(err) {
          console.error('Error al descargar:', err);
                    res.status(500).send({"error":'Error al descargar el archivo'});
        }
      });
    } else {
      res.status(404).send({"error":'Archivo no encontrado'});
    }
  } catch(error){
        console.error(error);
    res.status(500).json({ "error": "Error descargando registros" });
  }
}