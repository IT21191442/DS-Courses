import Video from "../models/Video.js";

// Create a new video
export const createVideo = async (req, res, next) => {
  const { courseid, coursename, description, sections, imgUrl, videoUrl } = req.body;

  if (!courseid || !coursename || !imgUrl || !videoUrl) {
    res.status(400);
    return next(new Error("courseid, coursename, imgUrl & videoUrl fields are required"));
  }

  try {
    const video = await Video.create({
      courseid,
      coursename,
      description,
      sections,
      imgUrl,
      videoUrl,
    });

    res.status(201).json({
      success: true,
      video,
    });
  } catch (error) {
    console.log(error);
    res.status(500);
    next(error);
  }
}
// Get all videos
export const getAllCourses = async (req, res, next) => {
  try {
    const videos = await Video.find();

    if (videos.length === 0) {
      res.status(404);
      return next(new Error("No videos found"));
    }

    res.status(200).json({
      success: true,
      count: videos.length,
      videos,
    });
  } catch (error) {
    console.log(error);
    res.status(500);
    next(error);
  }
}

// Get one video by ID
export const getCourseById = async (req, res, next) => {
  try {
    const courseId = req.params.id; // Using courseid instead of _id

    const video = await Video.findOne({ courseid: courseId });

    if (!video) {
      res.status(404);
      return next(new Error("Video not found"));
    }

    res.status(200).json({
      success: true,
      video,
    });
  } catch (error) {
    console.log(error);
    res.status(500);
    next(error);
  }
};

// Update one video by ID
export const updateCourseById = async (req, res, next) => {
  try {
    const courseId = req.params.id;
    const { courseid, coursename, description, sections, imgUrl, videoUrl } = req.body;

    // Check for required fields
    if (!courseid || !coursename || !imgUrl || !videoUrl) {
      res.status(400);
      return next(new Error("courseid, coursename, imgUrl & videoUrl fields are required"));
    }

    const updatedVideo = await Video.findOneAndUpdate(
      { courseid: courseId },
      {
        courseid,
        coursename,
        description,
        sections,
        imgUrl,
        videoUrl,
      },
      { new: true, runValidators: true } // Return the updated document and run validators
    );

    if (!updatedVideo) {
      res.status(404);
      return next(new Error("Video not found"));
    }

    res.status(200).json({
      success: true,
      video: updatedVideo,
    });
  } catch (error) {
    console.log(error);
    res.status(500);
    next(error);
  }
};


// Delete one video by ID
export const deleteCourseById = async (req, res, next) => {
  try {
    const courseId = req.params.id;

    const video = await Video.findOneAndRemove({ courseid: courseId });

    if (!video) {
      res.status(404);
      return next(new Error("Video not found"));
    }

    res.status(200).json({
      success: true,
      message: "Video deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500);
    next(error);
  }
};




