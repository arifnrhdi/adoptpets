import express from "express";
import { getAdopts, getAdoptById, createAdopt, updateAdopt, deleteAdopt, getAdoptsByUser} from "../controllers/AdoptController.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/adopt', getAdopts);
router.get('/adopt/user', verifyUser, getAdoptsByUser)
router.get('/adopt/:id', verifyUser, getAdoptById);
router.post('/adopt', verifyUser, createAdopt);
router.patch('/adopt/:id', verifyUser, updateAdopt);
router.delete('/adopt/:id', verifyUser, deleteAdopt);

export default router;