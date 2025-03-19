import express from "express";
import { registerUser, loginUser, getUserProfile, logoutUser, deleteUser, getAllUsers ,checkAuth} from "../controller/authController.js";
import { verifyToken, isAdmin } from "../MiddleWare/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", verifyToken, logoutUser);
router.get("/profile", verifyToken, getUserProfile);
router.get("/check", checkAuth);

// 🔹 Admin-Only Routes
router.delete("/delete/:id", verifyToken, isAdmin, deleteUser);
router.get("/all",verifyToken,isAdmin, getAllUsers); // Get all users

export default router;
