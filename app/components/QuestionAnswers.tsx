import { Badge } from '@mui/material';
import { remove, difference } from 'lodash';
import React, { useEffect, useState } from 'react'

export interface AnswerType {
  option: string,
  text: string
}

export interface QuestionAnswersType {
  questionId: string,
  question: string;
  answers: AnswerType[];
  answerCount: number;
  explanation: string;
  correctAnswers: string[];
  isImportant: boolean;
}

const QuestionAnswers = ({ questionAnswers }: { questionAnswers: QuestionAnswersType }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);

  useEffect(() => {
    setSelectedAnswers([]);
  }, [questionAnswers])

  const answerSelected = (option: string) => {
    if (questionAnswers.answerCount === 1) {
      setSelectedAnswers([
        option
      ])
    } else {
      if (selectedAnswers.indexOf(option) === 0) {
        const removedAnswer = remove(selectedAnswers, option)
        setSelectedAnswers(removedAnswer)
      } else {
        setSelectedAnswers([
          ...selectedAnswers,
          option
        ])
      }
    }
  }

  const renderAnswer = (answer: AnswerType, answerCount: number, correctAnswers: string[]) => {
    const answerCss = selectedAnswers.indexOf(answer.option) >= 0 && correctAnswers.indexOf(answer.option) >= 0 ?
      'py-2 px-2 bg-green-900 rounded-md' :
      'py-1 px-2'
    if (answerCount === 1) {
      return (
        <div className={answerCss}>
          <label>
            <input
              type='radio'
              id={answer.option}
              onChange={() => { answerSelected(answer.option) }}
              checked={selectedAnswers.indexOf(answer.option) >= 0}
            />
            <span className='pl-2 text-l'>{answer.text}</span>
          </label>
        </div>
      )
    } else {
      return (
        <div className={answerCss}>
          <label>
            <input
              type='checkbox'
              id={answer.option}
              onChange={() => answerSelected(answer.option)}
              checked={selectedAnswers.indexOf(answer.option) >= 0}
            />
            <span className='pl-2 text-l'>{answer.text}</span>
          </label>
        </div>
      )
    }
  }
  const allCorrect = selectedAnswers.length === questionAnswers.answerCount
    && difference(selectedAnswers, questionAnswers.correctAnswers).length === 0
  return (
    <Badge badgeContent={questionAnswers.questionId} max={999} className='mt-8' color="success">
      <div>
        <div className='my-4 border border-white rounded-md shadow-md'>
          <div className='p-4'>
            <div className='flex'>
              <div className='py-2 text-l'>{questionAnswers.question}</div>
              {questionAnswers.isImportant && <div className='bg-green-900 px-2 mb-8 rounded-b-lg content-center text-xl'>IMP</div>}
            </div>
            {questionAnswers.answers.map((answer, index) => {
              return (<div key={index}>{renderAnswer(answer, questionAnswers.answerCount, questionAnswers.correctAnswers)}</div>)
            })}
          </div>
        </div>
        {allCorrect &&
          <div>
            {questionAnswers.explanation}
          </div>
        }
      </div>
    </Badge>
  )
}

export default QuestionAnswers