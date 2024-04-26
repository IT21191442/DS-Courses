import { Link, Outlet } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      
      <Link to="/">Home</Link> | <Link to="upload">Upload</Link> 
      | <Link to="/getAllCourses">CourseList-admin</Link> <Link to="/AdminDashboard">AdminDashboard</Link> 
      <br />
      <br />
      <Outlet />

      
    </div>
  );
}

export default App;
