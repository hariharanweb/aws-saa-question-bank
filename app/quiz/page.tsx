'use client';
import React, { useEffect, useState } from 'react'
import QuestionsApi from '../services/QuestionsApi'
import QuestionAnswers from '../components/Question';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);

  const fetchQuestions = async () => {
    const questions = await QuestionsApi.getQuizQuestions();
    setQuestions(questions);
  }
  useEffect(() => {
    fetchQuestions();
  }, [])
  return (
    <div>
      <div>Questions</div>
      {questions.map((questionAnswers, index)=>{
        return (<div key={index}>{JSON.stringify(questionAnswers)}</div>);
      })}
    </div>
  )
}

export default Quiz