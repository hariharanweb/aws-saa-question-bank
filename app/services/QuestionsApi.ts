const QuestionsAPI = {
  getAllQuestions: async () => {
    const response = await fetch('/api/questions')
    return response.json()
  },
  getQuizQuestions: async () => {
    const response = await fetch('/api/quiz')
    return response.json()
  }
}

export default QuestionsAPI;