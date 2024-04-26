import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; 
import AdminDashboard from './AdminDashboard'; 

const CourseUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [course, setCourse] = useState(null);
  const [formData, setFormData] = useState({
    courseid: '',
    coursename: '',
    description: '',
    sections: '',
    price:'',
    references:'',
    imgUrl: '',
    videoUrl: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/videos/getOneCourseById/${id}`);
        setCourse(response.data.video);
        setFormData(response.data.video); 
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdate = async () => {
    try {
      const updateURL = `http://localhost:5000/api/videos/updateOneCourseById/${id}`;
      await axios.put(updateURL, formData);
      alert('Course updated successfully')
      navigate('/getAllCourses'); 
    } catch (error) {
      console.error(error);
    }
  };
  
  if (loading) {
    return <p>Loading...</p>;
  }

  if (!course) {
    return <p>Course not found</p>;
  }

  return (
    <div>
      <AdminDashboard />
      <h2>Update Course Details</h2>
      <form onSubmit={(e) => e.preventDefault()} style={styles.form}>
        <div style={styles.formGroup}>
          <label>Course ID:</label>
          <input 
            type="text" 
            name="courseid" 
            value={formData.courseid} 
            readOnly
            style={styles.input} 
          />
        </div>
        <div style={styles.formGroup}>
          <label>Course Name:</label>
          <input 
            type="text" 
            name="coursename" 
            value={formData.coursename} 
            onChange={handleChange} 
            required 
            style={styles.input} 
          />
        </div>
        <div style={styles.formGroup}>
          <label>Sections:</label>
          <input 
            type="text" 
            name="sections" 
            value={formData.sections} 
            onChange={handleChange} 
            style={styles.input} 
          />
        </div>
        <div style={styles.formGroup}>
          <label>Description:</label>
          <textarea 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            style={styles.textarea} 
          />
        </div>
        <div style={styles.formGroup}>
          <label>Image URL:</label>
          <input 
            type="text" 
            name="imgUrl" 
            value={formData.imgUrl} 
            onChange={handleChange} 
            style={styles.input} 
          />
        </div>
        <div style={styles.formGroup}>
          <label>Video URL:</label>
          <input 
            type="text" 
            name="videoUrl" 
            value={formData.videoUrl} 
            onChange={handleChange} 
            style={styles.input} 
          />
        </div>
        <div style={styles.formGroup}>
          <label>Price:</label>
          <textarea 
            name="price" 
            value={formData.price} 
            onChange={handleChange} 
            style={styles.textarea} 
          />
        </div>
        <div style={styles.formGroup}>
          <label>References:</label>
          <textarea 
            name="references" 
            value={formData.references} 
            onChange={handleChange} 
            style={styles.textarea} 
          />
        </div>
        <button type="button" onClick={handleUpdate} style={styles.button}>Update</button>
      </form>
    </div>
  );
};

const styles = {
  form: {
    maxWidth: '500px',
    margin: 'auto',
    padding: '20px',
  },
  formGroup: {
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
    minHeight: '100px',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
  },
};

export default CourseUpdate;
