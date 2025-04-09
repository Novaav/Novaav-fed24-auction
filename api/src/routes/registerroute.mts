import express from "express";
import { registerUser } from "../controllers/registercontroller.mts";

const router = express.Router();

router.post("/register", registerUser);


export default router;
