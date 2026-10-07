import express from "express";

import profileController from "../controllers/profileController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

//public
router.get("/", profileController.getProfiles)

//login required
router.get("/:id", protect,  profileController.getProfile);


router.post("/", profileController.createProfile)

router.put("/:id", profileController.updateProfile)

router.delete("/:id", profileController.deleteProfile)

export default router;