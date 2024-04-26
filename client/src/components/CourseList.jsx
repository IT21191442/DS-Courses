import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AdminDashboard from './AdminDashboard';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/videos/getAllCourses"
        );

        setCourses(response.data.videos || []);
        setLoading(false);
      } catch (error) {
        console.error("Fetch error:", error);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div style={styles.loaderContainer}>
        
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <AdminDashboard />
      <h2 style={styles.title}>Course List</h2>
      <div style={styles.courseContainer}>
        {courses.map((course, index) => (
          <div key={index} style={styles.courseItem}>
            <h3>{course.coursename || "N/A"}</h3>
            <p><strong>Course ID:</strong> {course.courseid || "N/A"}</p>
            <p><strong>Description:</strong> {course.description || "N/A"}</p>
            <p><strong>Sections:</strong> {course.sections || "N/A"}</p>
            <p><strong>Price:</strong> {course.price || "N/A"}</p>
            <img
              src={course.imgUrl || "N/A"}
              alt={course.coursename || "N/A"}
              style={styles.image}
            />
            <video controls style={styles.video}>
              <source src={course.videoUrl || ""} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div style={styles.buttonContainer}>
              <Link
                to={`/course/${course.courseid}`}
                style={styles.button}
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: 'auto',
    padding: '20px',
  },
  loaderContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
    textAlign: 'center',
  },
  courseContainer: {
    display: 'grid',
    gap: '20px',
  },
  courseItem: {
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '20px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  image: {
    maxWidth: '100%',
    marginBottom: '10px',
  },
  video: {
    maxWidth: '100%',
    marginTop: '10px',
  },
  buttonContainer: {
    marginTop: '10px',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '4px',
    textDecoration: 'none',
    cursor: 'pointer',
  },
};

export default CourseList;
