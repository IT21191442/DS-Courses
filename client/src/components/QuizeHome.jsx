import React from 'react';
import AdminDashboard from './AdminDashboard';
import { useParams, useNavigate } from 'react-router-dom';



const QuizHome = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleStartQuiz = () => {
    navigate(`/questions/${id}`);
    console.log(id);
  };

  return (
    <div style={styles.container}>
      <AdminDashboard />
      <div style={styles.iconContainer}>
        <div style={styles.icon}></div>
      </div>
      <h1 style={styles.title}>Welcome to QuizTime</h1>
      <p style={styles.subtitle}>Test your knowledge and have fun!</p>
      <button 
        style={styles.playButton}
        onClick={() => handleStartQuiz()}
      >
        Start Quiz
      </button>
     
    </div>
  );
};



// Inline styles
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '10vh',
    maxWidhth: '50vh',
    backgroundColor: '#f9f9f9',
    padding: '40px',
    
    borderRadius: '15px',  // Rounded corners
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '150px',
    height: '150px',
    backgroundColor: '#fff',  // White background for the icon container
    borderRadius: '50%',  // Rounded shape
    marginBottom: '30px',
    border: '2px solid #007bff',  // Border for the icon container
  },
  icon: {
    width: '100px',
    height: '100px',
    backgroundColor: '#007bff',  // Quiz icon color
    borderRadius: '50%',  // Rounded shape
  },
  title: {
    fontSize: '2.5em',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '20px',
  },
  subtitle: {
    fontSize: '1.2em',
    color: '#666',
    marginBottom: '30px',
    textAlign: 'center',
    maxWidth: '400px',
  },
  playButton: {
    padding: '15px 30px',
    fontSize: '1.2em',
    backgroundColor: '#007bff',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    ':hover': {
      backgroundColor: '#0056b3',
    },
  },
};

export default QuizHome;
