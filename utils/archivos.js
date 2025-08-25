import { promises as fs } from 'fs';
import path from "path";

export const getArchivo = function(filename) {
    try {
        const rutaArchivo = path.join("./uploads", filename);
        console.log('Archivo - Ruta', rutaArchivo);
        return rutaArchivo;
    }catch (err) {
        console.error('Error:', err);
        return null;
  }
}