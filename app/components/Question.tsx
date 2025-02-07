import React from 'react'

export interface QuestionAnswersType {
  question: string;
  answers: string[];
}

const QuestionAnswers = ({ question, answers }: QuestionAnswersType) => {
  return (
    <>
      <div>{question}</div>
      {answers.map((answer) => {
        return (<div>{answer}</div>)
      })}
    </>
  )
}

export default QuestionAnswers