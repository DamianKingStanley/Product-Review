import express from "express";
import auth from "../middleware/auth.js";
import {
  userRegister,
  login,
  // forgotPassword,
  // resetPassword,
  getAllUsers,
  getMyProfile,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/user/register", userRegister);
router.post("/user/login", login);
// router.post("/forgot-password", forgotPassword);
// router.post("/reset", resetPassword);
router.get("/users", auth, getAllUsers);
router.get("/user/profile/:userId", getMyProfile);

export default router;
