import express from "express";
const router = express.Router();
import { signup, signIn } from "../controllers/user.js";
router.post("/signup", signup);
router.post("/signin", signIn);
export default router;
