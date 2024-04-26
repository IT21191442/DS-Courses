import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Courses from "../Images/download.png";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/videos/getAllCourses');
        setCourses(response.data.videos || []);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Course List</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">  {/* Responsive grid for cards */}
        {courses.map((course, index) => (
          <div key={index} className="col mb-4">
            <Card style={{ backgroundColor: '#ffffff', borderRadius: '10px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>
              {/* <Card.Img variant="top" src={course.imgUrl || 'N/A'} alt={course.coursename || 'N/A'} style={{ height: '200px', objectFit: 'cover', borderRadius: '10px 10px 0 0' }} /> */}
               <Card.Img variant="top" src={Courses} alt={"CourseImage"} style={{ height: '200px', objectFit: 'cover', borderRadius: '10px 10px 0 0' }} /> 
              
              <Card.Body style={{ padding: '20px', backgroundColor: '#f5f5f5' }}>
                <Card.Title style={{ color: '#343a40', fontSize: '1.25rem', marginBottom: '15px' }}>
                  <b>{course.coursename || 'N/A'}</b>
                </Card.Title>
                <Card.Text style={{ color: '#6c757d', fontSize: '0.9rem' }}>
                  <strong>Course ID:</strong> {course.courseid || 'N/A'}
                  <br />
                  <strong>Price:</strong> {course.price || 'N/A'}
                  <br />
                  <strong>Sections:</strong> {course.sections || 'N/A'}
                </Card.Text>
                <Link to={`/course/${course.courseid}`} className="btn btn-primary" style={{ backgroundColor: '#007bff', borderColor: '#007bff', borderRadius: '0 0 10px 10px' }}>
                  View Course
                </Link>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
