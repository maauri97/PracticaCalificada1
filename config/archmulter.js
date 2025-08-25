import _multer from "multer";
import * as modelProduct from "../models/products.models.js";

const storage = _multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + "-" + Date.now() + getExtension(file.originalname)
        );
    },
});

function getExtension(filename) {
    return filename.substring(filename.lastIndexOf("."));
}

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Tipo de archivo invalido"), false);
  }
};

export const uploadProductImage = async function (req, res) {
    console.log('Multer Product');
    
    const uploadFile = _multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
  });
  uploadFile.single("archivo")(req, res, async (err) => {
    // todo correcto
    if (!err) {
      console.log(req.file);
      console.log(req.body.idproducts);
      if (!req.file) {
        return res
          .status(400)
          .json({ error: "No se encontro archivo a cargar" });
      }

      if (
        (await modelProduct.updateImage(
          req.body.idproducts,
          req.file.filename
        )) > 0
      ) {
        res.json({ mensaje: "Archivo cargado: ", file: req.file.filename });
      } else {
        return res.status(500).json({ error: "Error actualizando archivo" });
      }
    } else {
      console.log("Error de carga de archivo");
      console.log(err);
      // Error de Multer
      if (err instanceof _multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).json({ error: "Archivo demasiado pesado" });
        }
        return res.status(400).json({ error: err.message });
      }
      // Error desconocido
      return res.status(500).json({ error: err.message });
    }
  });
}