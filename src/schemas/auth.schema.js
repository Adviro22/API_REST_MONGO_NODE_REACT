import { z } from "zod";
 
export const createStudentSchema = z.object({
  nombre: z.string({required_error: "Title is required",}),
  nota1: z.number({required_error: "Nota1 es requerida",})
    .min(1,{message:"La nota debe ser como minimo 1 y maximo 50",})
    .max(50,{message:"La nota debe ser como minimo 1 y maximo 50"},),
  nota2: z.number({required_error: "Nota2 es requerida"},)
    .min(1,{message:"La nota debe ser como minimo 1 y maximo 50"},)
    .max(50,{message:"La nota debe ser como minimo 1 y maximo 50"},),
});