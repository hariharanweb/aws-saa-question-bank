'use client';
import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import QuestionsApi from '../services/QuestionsApi'
import QuestionAnswers, { QuestionAnswersType } from '../components/QuestionAnswers';

const Quiz = () => {
  const [questions, setQuestions] = useState<QuestionAnswersType[]>([]);
  const [areQuestionsLoaded, setAreQuestionsLoaded] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const fetchQuestions = async () => {
    setAreQuestionsLoaded(false)
    const questions = await QuestionsApi.getQuizQuestions();
    setQuestions(questions);
    setAreQuestionsLoaded(true);
  }
  useEffect(() => {
    fetchQuestions();
  }, [])

  const goToNextQuestion = () => {
    if (currentIndex <= questions.length)
      setCurrentIndex(currentIndex + 1)
  }

  const goToPreviousQuestion = () => {
    if (currentIndex > 0)
      setCurrentIndex(currentIndex - 1)
  }

  const renderQuestionAnswer = (questionAnswers: QuestionAnswersType) => {
    return (
      <QuestionAnswers questionAnswers={questionAnswers} />
    )
  }
  return (
    <div>
      <div className='text-2xl py-2'>Quiz</div>
      <hr />
      {areQuestionsLoaded &&
        <>
          {renderQuestionAnswer(questions[currentIndex])}
          <div className='grid grid-cols-2 place-items-stretch gap-4 py-4'>
            <Button variant="contained" onClick={() => goToPreviousQuestion()}>Previous</Button>
            <Button variant="contained" onClick={() => goToNextQuestion()}>Next</Button>
          </div>
        </>
      }
    </div>
  )
}

export default Quiz