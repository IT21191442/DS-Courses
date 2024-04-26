import React from 'react';
import { Link } from 'react-router-dom';

const SideNav = () => {
  return (
    <nav style={styles.nav}>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <Link to="/user" style={styles.navLink}>User</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/upload" style={styles.navLink}>Courses</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/getAllCourses" style={styles.navLink}>Payment</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/learner" style={styles.navLink}>Learner</Link>
        </li><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
        <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
        <li style={styles.navItem}>
          <Link to="/logout" style={styles.navLink}>Logout</Link>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  nav: {
    width: '250px',
    height: '100vh',
    position: 'fixed',
    top: '0',
    left: '0',
    backgroundColor: '#333',
    overflowY: 'auto',
    paddingTop: '20px',
  },
  navList: {
    listStyleType: 'none',
    padding: '0',
  },
  navItem: {
    marginBottom: '10px',
  },
  navLink: {
    display: 'block',
    padding: '10px 20px',
    color: '#fff',
    textDecoration: 'none',
    fontSize: '18px',
    transition: '0.3s',
  },
  'navLink:hover': {
  backgroundColor: '#555',
},

};

export default SideNav;
