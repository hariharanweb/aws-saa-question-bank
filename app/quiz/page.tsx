'use client';
import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import QuestionsApi from '../services/QuestionsApi'
import QuestionAnswers, { QuestionAnswersType } from '../components/QuestionAnswers';
import { LinearProgress } from '@mui/material';

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
    window.scrollTo(0, 0);
    if (currentIndex <= questions.length)
      setCurrentIndex(currentIndex + 1)
  }

  const goToPreviousQuestion = () => {
    window.scrollTo(0, 0);
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
      {areQuestionsLoaded &&
        <>
          <LinearProgress className='mt-4 pt-1' color='success' variant="determinate" value={((currentIndex) / questions.length) * 100} />
          {renderQuestionAnswer(questions[currentIndex])}
          <div className='grid grid-cols-2 place-items-stretch gap-4 py-4'>
            <Button variant="contained" onClick={() => goToPreviousQuestion()} disabled={currentIndex === 0}>Previous</Button>
            <Button variant="contained" onClick={() => goToNextQuestion()} disabled={currentIndex === questions.length - 1}>Next</Button>
          </div>
        </>
      }
    </div>
  )
}

export default Quiz
