import express from "express";

import profileController from "../controllers/profileController.js";

const router = express.Router();

router.get("/:id", profileController.getProfile);

router.get("/", profileController.getProfiles)

router.post("/", profileController.createProfile)

router.put("/:id", profileController.updateProfile)

router.delete("/:id", profileController.deleteProfile)

export default router;