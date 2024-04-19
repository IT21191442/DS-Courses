import React, { useState } from 'react';
import AdminDashboard from './AdminDashboard';

const questions = [
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
  

const JavaQuiz = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 1; // Change this to 10 for 10 questions per page
  const totalPages = Math.ceil(questions.length / questionsPerPage);

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
