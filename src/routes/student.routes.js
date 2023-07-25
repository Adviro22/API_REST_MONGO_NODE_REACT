import { Router } from "express";
import {
  createStudent,
  deleteStudent,
  getStudent,
  getStudents,
  updateStudent,
} from "../controllers/student.controllers.js";

import authenticateToken from "../middlewares/auth.token.js";
import { createStudentSchema } from "../schemas/student.schema.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
const router = Router();

router.get("/",authenticateToken, getStudents);

router.post("/",authenticateToken,validateSchema(createStudentSchema), createStudent);

router.get("/:id",authenticateToken, getStudent);

router.put("/:id",authenticateToken, updateStudent);

router.delete("/:id",authenticateToken, deleteStudent);

export default router;
