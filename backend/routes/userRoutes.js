import express from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";
import { getStores, rateStore } from "../controllers/userController.js";
import { updatePassword } from "../controllers/userController.js";

const router = express.Router();

router.use(authenticate, authorizeRoles("user"));
router.get("/stores", getStores);
router.post("/rate", rateStore);
router.put("/update-password", updatePassword);

export default router;
