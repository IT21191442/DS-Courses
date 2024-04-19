import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Upload from './components/Upload';
import SecureUpload from './components/SecureUpload';
import CourseListAdmin from './components/CourseListAdmin';
import CourseDetails from './components/CourseDetails';
import CourseUpdate from './components/CourseUpdate';
import AdminDashboard from './components/AdminDashboard'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="upload" element={<Upload />} />
      <Route path="secure-upload" element={<SecureUpload />} />
      <Route path="/getAllCourses" element={<CourseListAdmin />} />
      <Route path="/course/:id" element={<CourseDetails />} />
      <Route path="/updateCourse/:id" element={<CourseUpdate />} />
      <Route path="/AdminDashboard" element={<AdminDashboard />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);
