import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

// Pool: Conexión a la BD
const pool = mysql.createPool({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'practica',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default pool;
