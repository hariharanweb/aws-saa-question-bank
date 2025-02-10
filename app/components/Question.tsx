import React from 'react'

export interface QuestionAnswersType {
  question: string;
  answers: string[];
}

const QuestionAnswers = ({ questionAnswers }: { questionAnswers: QuestionAnswersType }) => {
  const renderAnswer = (answer: string) => {
    return (<div className='py-1'>
      <input type='radio' id={answer}/>
      <label className='pl-2'>{answer}</label>
    </div>)
  }
  return (
    <div className='py-2'>
      <div className='py-4'>{questionAnswers.question}</div>
      {questionAnswers.answers.map((answer, index) => {
        return (<div key={index}>{renderAnswer(answer)}</div>)
      })}
    </div>
  )
}

export default QuestionAnswers