import React from 'react'

export interface QuestionAnswersType {
  question: string;
  answers: string[];
  answerCount: number;
}

const QuestionAnswers = ({ questionAnswers }: { questionAnswers: QuestionAnswersType }) => {
  const renderAnswer = (answer: string, answerCount: number) => {
    if (answerCount === 1) {
      return (
        <div className='py-1'>
          <label>
            <input type='radio' id={answer} />
            <span className='pl-2'>{answer}</span>
          </label>
        </div>
      )
    } else {
      return (
        <div className='py-1'>
          <label>
            <input type='checkbox' id={answer} />
            <span className='pl-2'>{answer}</span>
          </label>
        </div>
      )
    }
  }

  return (
    <div className='my-4 border border-white rounded-md shadow-md'>
      <div className='p-2'>
        <div className='py-2'>{questionAnswers.question}</div>
        {questionAnswers.answers.map((answer, index) => {
          return (<div key={index}>{renderAnswer(answer, questionAnswers.answerCount)}</div>)
        })}
      </div>
    </div>
  )
}

export default QuestionAnswers