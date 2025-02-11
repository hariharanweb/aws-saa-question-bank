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
      'py-1 bg-green-900' :
      'py-1'
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

  return (
    <div className='my-4 border border-white rounded-md shadow-md'>
      <div className='p-4'>
        <div className='py-2 text-l'>{questionAnswers.question}</div>
        {questionAnswers.answers.map((answer, index) => {
          return (<div key={index}>{renderAnswer(answer, questionAnswers.answerCount, questionAnswers.correctAnswers)}</div>)
        })}
      </div>
    </div>
  )
}

export default QuestionAnswers