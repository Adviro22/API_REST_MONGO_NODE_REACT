import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import studentRoutes from "./routes/student.routes.js";
import authRoutes from './routes/auth.routes.js';
const app = express();
// llamar a los middlewares
app.use(cors());//permite conectarse con diferentes servidores
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.get("/",(req,res)=>{
    res.json("Pagina Principal")
})
// rutas autentitificacion y estudiante
app.use('/api/auth', authRoutes);
app.use("/api/student", studentRoutes);
export default app;