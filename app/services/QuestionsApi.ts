const getAllQuestions = async () => {
  const response = await fetch('/api/questions')
  return response.json()
};

export default {
  getAllQuestions
}