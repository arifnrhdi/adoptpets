import express from "express";
import {Register ,Login, Logout, Me } from "../controllers/Auth.js";

const router = express.Router();

router.post("/users", Register);
router.get("/me", Me);
router.post("/login", Login);
router.delete("/logout", Logout);

export default router;
