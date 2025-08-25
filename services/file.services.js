import _multer from "multer";
import * as archmulter from "../config/archmulter.js";
import * as archivos from "../utils/archivos.js";

export const uploadProductImage = function(req, res) {
    console.log("------------service------------");
    archmulter.uploadProductImage(req, res);
};

export const copiar = function(carpeta, filename) {
    console.log("------------service------------");
    return archivos.copiarArchivos(carpeta, filename);
};
