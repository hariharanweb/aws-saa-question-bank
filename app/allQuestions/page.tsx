'use client';
import React, { useEffect, useState } from 'react'
import QuestionsApi from '../services/QuestionsApi'

const Questions = () => {
  const [questions, setQuestions] = useState()

  const fetchQuestions = async () => {
    const questions = await QuestionsApi.getAllQuestions();
    setQuestions(questions);
  }
  useEffect(() => {
    fetchQuestions();
  }, [])
  return (
    <div>
      <div>Questions</div>
      {JSON.stringify(questions)}
    </div>
  )
}

export default Questions