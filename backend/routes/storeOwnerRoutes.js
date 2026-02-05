import express from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";
import { getRatings } from "../controllers/storeOwnerController.js";

const router = express.Router();

router.use(authenticate, authorizeRoles("storeOwner"));
router.get("/ratings", getRatings);

export default router;
