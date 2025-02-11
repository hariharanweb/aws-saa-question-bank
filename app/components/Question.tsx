import { remove } from 'lodash';
import React, { useEffect, useState } from 'react'

export interface AnswerType {
  option: string,
  text: string
}

export interface QuestionAnswersType {
  question: string;
  answers: AnswerType[];
  answerCount: number;
  explanation: string;
  correctAnswers: string[];
  isImportant: boolean;
}

const QuestionAnswers = ({ questionAnswers }: { questionAnswers: QuestionAnswersType }) => {

  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);

  useEffect(() => {
    setSelectedAnswers([]);
  }, [questionAnswers])

  const answerSelected = (answer: number) => {
    if (questionAnswers.answerCount === 1) {
      setSelectedAnswers([
        answer
      ])
    } else {
      if (selectedAnswers.indexOf(answer) === 0) {
        const removedAnswer = remove(selectedAnswers, answer)
        setSelectedAnswers(removedAnswer)
      } else {
        setSelectedAnswers([
          ...selectedAnswers,
          answer
        ])
      }
    }
  }

  const renderAnswer = (index: number, answer: AnswerType, answerCount: number) => {
    if (answerCount === 1) {
      return (
        <div className='py-1'>
          <label>
            <input type='radio' id={answer.option} onChange={() => { answerSelected(index) }} checked={selectedAnswers.indexOf(index) >= 0} />
            <span className='pl-2 text-l'>{answer.text}</span>
          </label>
        </div>
      )
    } else {
      return (
        <div className='py-1'>
          <label>
            <input type='checkbox' id={answer.option} onChange={() => answerSelected(index)} checked={selectedAnswers.indexOf(index) >= 0} />
            <span className='pl-2 text-l'>{answer.text}</span>
          </label>
        </div>
      )
    }
  }

  return (
    <div className='my-4 border border-white rounded-md shadow-md'>
      <div className='p-4'>
        <div className='py-2 text-l'>{questionAnswers.question}</div>
        {questionAnswers.answers.map((answer, index) => {
          return (<div key={index}>{renderAnswer(index, answer, questionAnswers.answerCount)}</div>)
        })}
      </div>
    </div>
  )
}

export default QuestionAnswers