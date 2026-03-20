import express from "express";
import {
    registerUser,
    loginUser,
    refreshAccessToken,
    logoutUser
} from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/refresh", refreshAccessToken);
router.post("/logout", protect, logoutUser);

router.get("/profile", protect, (req, res) => {
    res.json({ message: "Protected route", user: req.user });
});

export default router;