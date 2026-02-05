import express from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";
import {
  getDashboardStats,
  addUser,
  addStore,
  getAllStores,
  getAllAdminUsers,
  getUserById,
  storeOwner
} from "../controllers/adminController.js";

const router = express.Router();

router.use(authenticate, authorizeRoles("admin"));

router.get("/stats", getDashboardStats);
router.get("/users", getAllAdminUsers);
router.get("/stores", getAllStores);
router.get("/user/:id", getUserById);
router.get("/store-owners", storeOwner);
router.post("/add-user", addUser);
router.post("/add-store", addStore);

export default router;
