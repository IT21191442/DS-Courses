import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import AdminDashboard from './components/AdminDashboard'
import Upload from './components/Upload';
import CourseListAdmin from './components/CourseListAdmin';
import CourseDetails from './components/CourseDetails';
import CourseUpdate from './components/CourseUpdate';
import QuizHome from './components/QuizeHome';
import Questions from './components/Questions';

function App() {
  return (
    <div className="App">
    <AdminDashboard/>
      <Routes>
      
        {/* <Route path="/AdminDashboard" exact element={<AdminDashboard />} /> */}
        <Route path="/upload" element={<Upload />} />
        <Route path="/getAllCourses" element={<CourseListAdmin />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/updateCourse/:id" element={<CourseUpdate />} />
        <Route path="/quizeHome/:id" element={<QuizHome />} />
        <Route path="/questions/:id" element={<Questions />} />
      </Routes>
    </div>
  );
}

export default App;
