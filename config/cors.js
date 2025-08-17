import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const FRONTEND_URL = "http://" + process.env.INDEX_URL + ":" + process.env.PORT;

const corsOptions = {
    origin: FRONTEND_URL,
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}

export default cors(corsOptions);
