import { Router } from "express";
import { register, login, registerSchema, loginSchema } from "../controllers/auth.controller";
import validate from "../middleware/validate" //"../middlewares/validate";

const router = Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

export default router;
