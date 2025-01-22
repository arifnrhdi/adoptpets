import express from "express"
import { getUsers, getUserById, updateUser, deleteUser } from "../controllers/UserController.js"
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/users', verifyUser, getUsers);
router.get('/user/:id', verifyUser, getUserById);
router.patch('/user/:id', verifyUser, updateUser);
router.delete('/user/:id', verifyUser, deleteUser);

export default router;