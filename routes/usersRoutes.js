import express from "express";
import { signin, register } from "../controllers/userControl.js";
const usersRoutes = express.Router();


usersRoutes.post('/signin', signin);
usersRoutes.post('/register', register);

export default usersRoutes