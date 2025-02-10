const getAllQuestions = async () => {
  const response = await fetch('/api/questions')
  return response.json()
};

const getQuizQuestions = async () => {
  const response = await fetch('/api/quiz')
  return response.json()
};

export default {
  getAllQuestions,
  getQuizQuestions
}