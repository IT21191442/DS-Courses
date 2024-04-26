import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { ThreeDots } from 'react-loader-spinner';
import AdminDashboard from './AdminDashboard'; 



const Upload = () => {
  const [courseid, setCourseid] = useState('');
  const [coursename, setCoursename] = useState('');
  const [description, setDescription] = useState('');
  const [sections, setSections] = useState('');
  const [references, setReferences] = useState('');
  const [price, setPrice] = useState('');
  const [img, setImg] = useState(null);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const uploadFile = async (type) => {
    const data = new FormData();
    data.append("file", type === 'image' ? img : video);
    data.append("upload_preset", type === 'image' ? 'images_preset' : 'videos_preset');

    try {
      const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || 'dsf1kurrq';
      let resourceType = type === 'image' ? 'image' : 'video';
      let api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

      const res = await axios.post(api, data);
      const { secure_url } = res.data;
      return secure_url;
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      // Upload image file
      const imgUrl = await uploadFile('image');

      // Upload video file
      const videoUrl = await uploadFile('video');

      // Send backend api request
      await axios.post(`${process.env.REACT_APP_BACKEND_BASEURL || 'http://localhost:5000'}/api/videos`, {
        courseid,
        coursename,
        description,
        sections,
        references,
        price,
        imgUrl,
        videoUrl
      });

      // Reset states 
      setCourseid('');
      setCoursename('');
      setDescription('');
      setSections('');
      setReferences('');
      setPrice('');
      setImg(null);
      setVideo(null);

      console.log("Course upload success!");
      setLoading(false);
      alert('course uploaded sucessfully !')
      navigate("/getAllCourses");
    } catch (error) {
      console.error(error);
    }
  }


    return (
      <div style={styles.container}>
        <AdminDashboard />
        <h2 style={styles.title}>Upload Course</h2>
  
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="courseid" style={styles.label}>Course ID:</label>
            <input
              type="text"
              value={courseid}
              onChange={(e) => setCourseid(e.target.value)}
              required
              style={styles.input}
            />
          </div>
  
          <div style={styles.formGroup}>
            <label htmlFor="coursename" style={styles.label}>Course Name:</label>
            <input
              type="text"
              value={coursename}
              onChange={(e) => setCoursename(e.target.value)}
              required
              style={styles.input}
            />
          </div>
  
          <div style={styles.formGroup}>
            <label htmlFor="description" style={styles.label}>Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              style={styles.textarea}
            />
          </div>
  
          <div style={styles.formGroup}>
            <label htmlFor="sections" style={styles.label}>Sections:</label>
            <input
              type="text"
              value={sections}
              onChange={(e) => setSections(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="references" style={styles.label}>References:</label>
            <input
              type="text"
              value={references}
              onChange={(e) => setReferences(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="price" style={styles.label}>Course Price:</label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              style={styles.input}
            />
          </div>
  
          <div style={styles.formGroup}>
            <label htmlFor="video" style={styles.label}>Video:</label>
            <input
              type="file"
              accept="video/*"
              id="video"
              onChange={(e) => setVideo(e.target.files[0])}
              required
              style={styles.fileInput}
            />
          </div>
  
          <div style={styles.formGroup}>
            <label htmlFor="img" style={styles.label}>Image:</label>
            <input
              type="file"
              accept="image/*"
              id="img"
              onChange={(e) => setImg(e.target.files[0])}
              required
              style={styles.fileInput}
            />
          </div>
  
          <button type="submit" style={styles.submitButton}>Upload</button>
        </form>
  
        {loading && (
          <div style={styles.loader}>
            <ThreeDots
              height="80"
              width="80"
              radius="9"
              color="#4fa94d"
              ariaLabel="three-dots-loading"
            />
          </div>
        )}
      </div>
    );
  };
  
  const styles = {
    container: {
      maxWidth: '800px',
      margin: 'auto',
      padding: '20px',
    },
    title: {
      fontSize: '24px',
      marginBottom: '20px',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
    },
    formGroup: {
      marginBottom: '20px',
    },
    label: {
      fontSize: '18px',
      marginBottom: '10px',
      display: 'block',
    },
    input: {
      width: '100%',
      padding: '10px',
      fontSize: '16px',
      border: '1px solid #ccc',
      borderRadius: '4px',
    },
    textarea: {
      width: '100%',
      padding: '10px',
      fontSize: '16px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      minHeight: '100px',
    },
    fileInput: {
      width: '100%',
      padding: '10px',
    },
    submitButton: {
      backgroundColor: '#007bff',
      color: '#fff',
      padding: '10px 20px',
      fontSize: '18px',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    loader: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '20px',
    },
  };

export default Upload;
