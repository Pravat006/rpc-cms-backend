import express from "express";
import { loginUser, logout, refreshTokens, registerUser, loginAsAdmin, getMe, updatePassword, updateUser } from "../auth/auth.controller";
import { auth, authenticatedActionLimiter, authLimiter } from "@/middlewares";
import { upload } from "@/config/cloudinary";

const router = express.Router();

router.post("/register", authLimiter, registerUser);

router.post("/login", authLimiter, loginUser);

router.post("/admin-login", authLimiter, loginAsAdmin)

router.post("/refresh-tokens", authLimiter, refreshTokens);

router.post("/logout", authLimiter, logout);


router.get("/me", auth(), authenticatedActionLimiter, getMe);

router.patch("/password", auth(), authenticatedActionLimiter, updatePassword);

router.patch("/profile", auth(), authenticatedActionLimiter, upload.single('image'), updateUser);

export const authRouter = router;