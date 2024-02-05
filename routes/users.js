import express from "express";
const router = express.Router();
import { auth } from '#auth/index.js';

import { signup, login, logout, current } from '#controllers/users/index.js';

router.post('/signup', auth, signup);

router.post("/login", auth, login);

router.get("/logout", auth, logout);

router.get("/current", auth, current);



export { router as usersRouter };