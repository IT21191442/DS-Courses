import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';

const CourseQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/videos/getOneCourseById/${id}`);
        setCourse(response.data.video);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching course details:', error);
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [id]);

  const handleDelete = async () => {
    const shouldDelete = window.confirm("Are you sure you want to delete this course?");
    
    if (shouldDelete) {
      try {
        const deleteURL = `http://localhost:5000/api/videos/deleteOneCourseById/${id}`;
        await axios.delete(deleteURL);
        console.log("Course deleted successfully!");
        navigate('/getAllCourses');
      } catch (error) {
        console.error('Error deleting course:', error);
      }
    }
  };

  const handleUpdate = () => {
    navigate(`/updateCourse/${id}`);
  };

  const handleStartQuiz = () => {
    navigate(`/quizeHome/${id}`);
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
      <div style={styles.container}>
        
        <h2>{course?.coursename || 'Course Name N/A'}</h2>
        <p>Course ID: {course?.courseid || 'Course ID N/A'}</p>
        <img 
          src={course?.imgUrl || 'Image URL N/A'} 
          alt={course?.coursename || 'Course Name N/A'} 
          style={styles.image}
        />
        <p>Description: {course?.description || 'Description N/A'}</p>
        <p>Sections: {course?.sections || 'Sections N/A'}</p>
        <video controls style={styles.video}>
          <source src={course?.videoUrl || ''} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <p>References: {course?.references || 'References N/A'}</p>
        <p>Price: {course?.price || 'Price N/A'}</p>

        <div style={styles.buttonContainer}>
          <button style={styles.button} onClick={handleDelete}>Delete</button>
          <button style={styles.button} onClick={handleUpdate}>Update</button>
          <button style={styles.button} onClick={handleStartQuiz}>Start Quiz</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    margin: '80px 20px 20px 20px', // Added top margin to account for the navbar
    padding: '20px 400px',
    border: '1px solid #ccc',
    borderRadius: '8px',
  },
  image: {
    maxWidth: '300px',
    marginTop: '20px',
  },
  video: {
    maxWidth: '300px',
    marginTop: '10px',
  },
  buttonContainer: {
    marginTop: '20px',
  },
  button: {
    margin: '0 10px',
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default CourseQuiz;
