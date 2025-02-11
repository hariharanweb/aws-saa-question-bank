const fs = require('fs');

const parse = () => {
  const questionsText = fs.readFileSync('./parser/questions.txt', { encoding: 'utf-8' });
  const regex = /Question #(\d+)\n([\s\S]*?)(?=(?:Question #\d+)|={10}|$)/g; // The key improvement

  let questions = [];

  let match;
  while ((match = regex.exec(questionsText))) {
    const questionId = match[1];
    const questionText = match[2].trim();

    // Split question text into question and answers
    const questionParts = questionText.split(/(^[A-E]\..*)$/gm); // Split by answer options
    const question = questionParts[0].trim();
    let answerCount = 1;
    if (question.toLowerCase().indexOf('choose two') >= 0) {
      answerCount = 2
    } else if (question.toLowerCase().indexOf('choose three') >= 0) {
      answerCount = 3
    }
    const answers = [];
    const answerOptions = ['A', 'B', 'C', 'D', 'E', 'F']
    for (let i = 1; i < questionParts.length; i += 2) {
      if (questionParts[i]) {
        const option = questionParts[i].trim();
        const answerText = option.substring(2).trim();
        answers.push({
          option: answerOptions[answers.length],
          text: answerText
        });
      }
    }

    questions.push({
      questionId,
      question,
      answers,
      answerCount
    });
  }
  return questions;
}
const output = parse();
const outputJSON = JSON.stringify(output, null, 2);
fs.writeFileSync('./app/api/questions.json', outputJSON);

