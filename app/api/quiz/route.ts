import { NextResponse } from "next/server";
import questionsWithAnswers from '../questionsWithAnswers.json';
import { shuffle, take } from 'lodash';

export async function GET() {
  const quizQuestions = shuffle(questionsWithAnswers);
  const subQuestions = take(quizQuestions, 50)
  return NextResponse.json(subQuestions)
}