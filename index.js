import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();
import api from "./routes.js";
// import cors from "./config/cors.js"
import swaggerUI from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";


// App general
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, type: 'application/x-www-form-urlenconded'}));
const PUERTO = process.env.APP_PORT || 3000;


// Endpoint de API
app.use("/api", api);
app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerSpec));


// Correr
app.listen(PUERTO, () => {
    console.log("Escuchando en "+PUERTO);
});
