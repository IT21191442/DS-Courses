import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import AdminDashboard from "./AdminDashboard";

const Upload = () => {
  const [courseid, setCourseid] = useState("");
  const [coursename, setCoursename] = useState("");
  const [description, setDescription] = useState("");
  const [sections, setSections] = useState("");
  const [references, setReferences] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState(null);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const uploadFile = async (type) => {
    const data = new FormData();
    data.append("file", type === "image" ? img : video);
    data.append(
      "upload_preset",
      type === "image" ? "images_preset" : "videos_preset"
    );

    try {
      const cloudName =
        process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || "dsf1kurrq";
      let resourceType = type === "image" ? "image" : "video";
      let api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

      const res = await axios.post(api, data);
      const { secure_url } = res.data;
      return secure_url;
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      // Upload image file
      const imgUrl = await uploadFile("image");

      // Upload video file
      const videoUrl = await uploadFile("video");

      // Send backend api request
      await axios.post(
        `${
          process.env.REACT_APP_BACKEND_BASEURL || "http://localhost:5000"
        }/api/videos`,
        {
          courseid,
          coursename,
          description,
          sections,
          references,
          price,
          imgUrl,
          videoUrl,
        }
      );

      // Reset states
      setCourseid("");
      setCoursename("");
      setDescription("");
      setSections("");
      setReferences("");
      setPrice("");
      setImg(null);
      setVideo(null);

      console.log("Course upload success!");
      setLoading(false);
      alert("course uploaded successfully !");
      navigate("/getAllCourses");
    } catch (error) {
      console.error(error);
    }
  };

  const handleViewCourses = () => {
    navigate("/getAllCourses");
  };

  return (
    <div>
      <AdminDashboard />
      <div className="bg-gray-700 text-gray-100 py-8">
        <h2 className="text-3xl font-bold text-gray-100 mt-0 text-center">
          Upload Course
        </h2>

        <form
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto bg-gray-600 p-8 rounded-lg"
          encType="multipart/form-data"
        >
          <div className="mb-4">
            <label htmlFor="courseid" className="block mb-2">
              Course ID:
            </label>
            <input
              type="text"
              value={courseid}
              onChange={(e) => setCourseid(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-500 rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="coursename" className="block mb-2">
              Course Name:
            </label>
            <input
              type="text"
              value={coursename}
              onChange={(e) => setCoursename(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-500 rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block mb-2">
              Description:
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-500 rounded"
              rows="6"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="sections" className="block mb-2">
              Sections:
            </label>
            <input
              type="text"
              value={sections}
              onChange={(e) => setSections(e.target.value)}
              className="w-full px-4 py-2 border border-gray-500 rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="references" className="block mb-2">
              References:
            </label>
            <input
              type="text"
              value={references}
              onChange={(e) => setReferences(e.target.value)}
              className="w-full px-4 py-2 border border-gray-500 rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="price" className="block mb-2">
              Course Price:
            </label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-2 border border-gray-500 rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="video" className="block mb-2">
              Video:
            </label>
            <input
              type="file"
              accept="video/*"
              id="video"
              onChange={(e) => setVideo(e.target.files[0])}
              required
              className="w-full"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="img" className="block mb-2">
              Image:
            </label>
            <input
              type="file"
              accept="image/*"
              id="img"
              onChange={(e) => setImg(e.target.files[0])}
              required
              className="w-full"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Upload
          </button>
        </form>

        {loading && (
          <div className="flex justify-center mt-4">
            <ThreeDots
              height="80"
              width="80"
              radius="9"
              color="#4fa94d"
              ariaLabel="three-dots-loading"
            />
          </div>
        )}
        {/* Button to view courses */}
        <button
          onClick={handleViewCourses}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded absolute top-8 right-8"
        >
          View Courses
        </button>
      </div>
    </div>
  );
};

export default Upload;
