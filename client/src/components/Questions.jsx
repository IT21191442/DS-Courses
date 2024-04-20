import React, { useState } from 'react';
import AdminDashboard from './AdminDashboard';

const questions = [
  //Java questions
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

    //python questions
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
  

  const JavaQuiz = ({ courseId }) => {
    // Filter questions based on courseId
    const filteredQuestions = questions.filter(question => !question.courseId || question.courseId === courseId);
  
    const [currentPage, setCurrentPage] = useState(1);
    const questionsPerPage = 1; // Change this to 10 for 10 questions per page
    const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);
  

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const renderQuestions = () => {
    const startIndex = (currentPage - 1) * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const currentQuestions = questions.slice(startIndex, endIndex);

    return currentQuestions.map((question, index) => (
      <div key={question.id}>
        <p>{question.question}</p>
        {question.options.map((option, optionIndex) => (
          <div key={optionIndex}>
            <input
              type="radio"
              id={`${question.id}-${optionIndex}`}
              name={`question-${question.id}`}
              value={option}
            />
            <label htmlFor={`${question.id}-${optionIndex}`}>{option}</label>
          </div>
        ))}
      </div>
    ));
  };

  return (
    
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px 500px' }}>
    <AdminDashboard />
      <h1>Java Quiz</h1>
      {renderQuestions()}
      <div>
        <button onClick={handlePrevPage} style={{ marginRight: '10px' }}>
          Prev
        </button>
        <button onClick={handleNextPage}>Next</button>
      </div>
      <p>
        Page {currentPage} of {totalPages}
      </p>
    </div>
  );
};

export default JavaQuiz;
