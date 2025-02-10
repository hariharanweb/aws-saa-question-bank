import React from 'react'

export interface QuestionAnswersType {
  question: string;
  answers: string[];
}

const QuestionAnswers = ({ questionAnswers }: { questionAnswers: QuestionAnswersType }) => {
  const renderAnswer = (answer: string) => {
    return (<>
      <input type='radio' />
      {answer}
    </>)
  }
  return (
    <>
      <div>{questionAnswers.question}</div>
      {questionAnswers.answers.map((answer, index) => {
        return (<div key={index}>{renderAnswer(answer)}</div>)
      })}
    </>
  )
}

export default QuestionAnswers