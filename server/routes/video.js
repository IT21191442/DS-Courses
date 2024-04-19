// Backend Route Configuration
import express from "express";
import { createVideo, getAllCourses, getCourseById, deleteCourseById, updateCourseById } from "../controllers/video.js";

const router = express.Router();

// Create a new video
router.post("/", createVideo);

// Get all videos
router.get("/getAllCourses", getAllCourses); 

// Get one video by ID
router.get("/getOneCourseById/:id", getCourseById);

// Update one video by ID
router.put("/updateOneCourseById/:id", updateCourseById);

// Delete one video by ID
router.delete("/deleteOneCourseById/:id", deleteCourseById);


export default router;
