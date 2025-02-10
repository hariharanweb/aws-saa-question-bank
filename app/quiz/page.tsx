'use client';
import React, { useEffect, useState } from 'react'
import QuestionsApi from '../services/QuestionsApi'
import QuestionAnswers, { QuestionAnswersType } from '../components/Question';

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
      <div>Quiz</div>
      {areQuestionsLoaded &&
        <>
          {renderQuestionAnswer(questions[currentIndex])}
          <input type='button' onClick={() => goToPreviousQuestion()} value={'Prev'} />
          <input type='button' onClick={() => goToNextQuestion()} value={'Next'} />
        </>
      }
    </div>
  )
}

export default Quiz