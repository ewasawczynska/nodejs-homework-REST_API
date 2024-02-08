import express from "express";
const router = express.Router();
import { auth } from '#auth/index.js';
import { uploadMiddleware } from '#middleware/index.js';

import { signup, login, logout, current, updateAvatar } from '#controllers/users/index.js';

router.post('/signup', signup);

router.post("/login", login);

router.get("/logout", auth, logout);

router.get("/current", auth, current);

router.patch("/avatars", auth, uploadMiddleware.single("avatar"), updateAvatar);



export { router as usersRouter };