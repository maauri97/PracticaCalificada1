import * as sfile from "../services/file.services.js";

export const uploadProductImage = function(req, res) {
    console.log("------------file-controller-upload-----------");
    sfile.uploadProductImage(req, res);
}

export const copiar = function(req, res) {
    console.log("------------file-controller-copiar-----------");
    if(sfile.copiar(req.body.carpeta, req.body.filename)){
        res.json({mensaje:"archivo copiado"});
    }else{
        res.status(500).json({"error":"no se pudo copiar los archivos"});
    }
}
