import { NextResponse } from "next/server";
import questions from '../questions.json';
import { shuffle, take } from 'lodash';

export async function GET() {
  const quizQuestions = shuffle(questions);
  const subQuestions = take(quizQuestions, 50)
  return NextResponse.json(subQuestions)
}