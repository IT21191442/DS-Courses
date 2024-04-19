import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    courseid: {
      type: String,
      required: true,
    },

    coursename: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    sections: {
      type: String,
    },
    imgUrl: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Video", videoSchema);
