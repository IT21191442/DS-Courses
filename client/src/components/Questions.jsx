import { useParams } from 'react-router-dom';
import React, { useState } from 'react';
import AdminDashboard from './AdminDashboard';


const Questions = () => {
  const { id } = useParams();

  // Java Questions
  const javaQuestions = [
    {
      id: 1,
      question: 'What is Java?',
      options: ['Programming Language', 'Operating System', 'Database', 'Hardware'],
      answer: 'Programming Language',
    },
    {
      id: 2,
      question: 'Which keyword is used to prevent method overriding?',
      options: ['final', 'abstract', 'static', 'private'],
      answer: 'final',
    },
    {
      id: 3,
      question: 'Which data type is used to create a variable that should store text?',
      options: ['String', 'int', 'char', 'boolean'],
      answer: 'String',
    },
    {
      id: 4,
      question: 'Which of the following is not a Java keyword?',
      options: ['delegate', 'volatile', 'native', 'interface'],
      answer: 'delegate',
    },
    {
      id: 5,
      question: 'What is the default value of byte datatype in Java?',
      options: ['0', '0.0', 'null', 'undefined'],
      answer: '0',
    },
    {
      id: 6,
      question: 'Which of the following is a marker interface?',
      options: ['Runnable', 'Serializable', 'Comparable', 'Cloneable'],
      answer: 'Serializable',
    },
    {
      id: 7,
      question: 'What does JVM stands for?',
      options: ['Java Virtual Machine', 'Java Virtual Memory', 'Java Variable Memory', 'Java Verified Machine'],
      answer: 'Java Virtual Machine',
    },
    {
      id: 8,
      question: 'Which operator is used to allocate memory to an object?',
      options: ['new', 'alloc', 'malloc', 'create'],
      answer: 'new',
    },
    {
      id: 9,
      question: 'Which method is used to compare two strings for their equality?',
      options: ['equals()', 'compare()', 'isEqual()', 'compareTo()'],
      answer: 'equals()',
    },
    {
      id: 10,
      question: 'What is the superclass of all exception classes?',
      options: ['Throwable', 'Error', 'Exception', 'RuntimeException'],
      answer: 'Throwable',
    },
  ];

  // Python Questions
  const pythonQuestions = [
    {
      id: 1,
      question: 'What is Python?',
      options: ['Programming Language', 'Operating System', 'Database', 'Hardware'],
      answer: 'Programming Language',
    },
    {
      id: 2,
      question: 'Which keyword is used to define a function in Python?',
      options: ['func', 'function', 'def', 'define'],
      answer: 'def',
    },
    {
      id: 3,
      question: 'Which of the following is not a Python data type?',
      options: ['int', 'double', 'str', 'list'],
      answer: 'double',
    },
    {
      id: 4,
      question: 'How do you start a comment in Python?',
      options: ['//', '/*', '#', '--'],
      answer: '#',
    },
    {
      id: 5,
      question: 'Which of the following is used to loop through a sequence?',
      options: ['for', 'foreach', 'while', 'loop'],
      answer: 'for',
    },
    {
      id: 6,
      question: 'What is the output of `print(3 * "Python")`?',
      options: ['3Python', 'PythonPythonPython', '3 Python', 'Error'],
      answer: 'PythonPythonPython',
    },
    {
      id: 7,
      question: 'Which method is used to remove an item from a list?',
      options: ['delete()', 'remove()', 'pop()', 'discard()'],
      answer: 'remove()',
    },
    {
      id: 8,
      question: 'What is the result of `3 + 2 * 2`?',
      options: ['7', '10', '9', '6'],
      answer: '7',
    },
    {
      id: 9,
      question: 'Which library is used for data visualization in Python?',
      options: ['matplotlib', 'numpy', 'pandas', 'scipy'],
      answer: 'matplotlib',
    },
    {
      id: 10,
      question: 'What is the output of `bool("False")`?',
      options: ['True', 'False', 'Error', '0'],
      answer: 'True',
    },
  ];

  

  const questions = id === 'JV3070' ? javaQuestions : pythonQuestions;

  const [selectedOptions, setSelectedOptions] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 2;
  const totalPages = Math.ceil(questions.length / questionsPerPage);

  const handleOptionChange = (questionId, option) => {
    setSelectedOptions({
      ...selectedOptions,
      [questionId]: option,
    });
  };

  const renderQuestions = () => {
    const startIndex = (currentPage - 1) * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;

    return questions.slice(startIndex, endIndex).map((questionObj, index) => (
      <div key={index} style={styles.question}>
        <strong>Question {questionObj.id}:</strong> {questionObj.question}
        <ul style={styles.optionsList}>
          {questionObj.options.map((option, optionIndex) => (
            <li key={optionIndex}>
              <label>
                <input
                  type="radio"
                  name={`question${questionObj.id}`}
                  value={option}
                  checked={selectedOptions[questionObj.id] === option}
                  onChange={() => handleOptionChange(questionObj.id, option)}
                />
                {option}
              </label>
            </li>
          ))}
        </ul>
      </div>
    ));
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const calculateScore = () => {
    let correctCount = 0;
    let wrongCount = 0;

    questions.forEach((question) => {
      const selectedOption = selectedOptions[question.id];
      if (selectedOption === question.answer) {
        correctCount++;
      } else {
        wrongCount++;
      }
    });

    const totalQuestions = questions.length;
    const score = (correctCount / totalQuestions) * 100;

    return {
      correctCount,
      wrongCount,
      totalQuestions,
      score,
    };
  };

  const handleSubmit = () => {
    // Calculate the score when the Submit button is clicked
    const { correctCount, wrongCount, totalQuestions, score } = calculateScore();
    setScoreDetails({
      correctCount,
      wrongCount,
      totalQuestions,
      score,
    });
  };

  // State to store the score details
  const [scoreDetails, setScoreDetails] = useState({
    correctCount: 0,
    wrongCount: 0,
    totalQuestions: 0,
    score: 0,
  });

  const { correctCount, wrongCount, totalQuestions, score } = calculateScore();


  return (
      <div style={styles.container}>
        <AdminDashboard />
        <h1>{id === 'JV3070' ? 'Java Questions' : 'Python Questions'}</h1>
        <div style={styles.questionsContainer}>
          {renderQuestions()}
        </div>
        <div style={styles.pagination}>
          <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
          <span>{currentPage} / {totalPages}</span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
          {currentPage === totalPages && (
            <button onClick={handleSubmit} style={styles.submitButton}>Submit</button>
          )}
        </div>
        {scoreDetails.score !== 0 && (
          <div style={styles.resultContainer}>
            <h2>Result</h2>
            <p>Total Questions: {scoreDetails.totalQuestions}</p>
            <p>Correct Answers: {scoreDetails.correctCount}</p>
            <p>Wrong Answers: {scoreDetails.wrongCount}</p>
            <p>Total Score: {scoreDetails.score.toFixed(2)}%</p>
          </div>
        )}
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
    minHeight: '90vh',
    backgroundColor: '#f9f9f9',
    padding: '40px',
    borderRadius: '15px',
  },
  questionsContainer: {
    width: '80%',
    maxWidth: '800px',
    marginTop: '30px',
  },
  question: {
    marginBottom: '20px',
    padding: '15px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  optionsList: {
    listStyleType: 'none',
    paddingLeft: '20px',
  },
  pagination: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultContainer: {
    marginTop: '30px',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    width: '80%',
    maxWidth: '800px',
  },
  submitButton: {
    marginLeft: '20px',
  },
};


export default Questions;
