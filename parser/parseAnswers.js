const fs = require('fs');

const parse1 = () => {
  const answersText = fs.readFileSync('./parser/answers50.txt', { encoding: 'utf-8' })
  const answers = answersText.split('------------------------------')
  const ans50 = answers.map((answer) => {
    const questionRegex = /(\d+\])/;
    const optionRegex = /^([A-E]\.)\s/gm;
    const questionMatch = answer.match(questionRegex);
    const optionMatch = answer.match(optionRegex);
    if (questionMatch) {
      const questionId = questionMatch[1].replace(']', '').trim();
      const result = {
        questionId,
        explanation: answer.trim(),
        correctAnswers: [],
        isImportant: false
      }

      if (optionMatch) {
        const correctAnswers = new Set(optionMatch.map((option) => {
          return option.replace('. ', '')
        }))
        result['correctAnswers'] = Array.from(correctAnswers);
      }

      return result;
    }
  }).filter((a) => a)
  fs.writeFileSync('./answers50.json', JSON.stringify(ans50, null, 2));
}

const parse2 = () => {
  const answersText = fs.readFileSync('./parser/answers51-185.txt', { encoding: 'utf-8' })
  const answers = answersText.split('------------------------------')
  const ans51185 = answers.map((answer) => {
    const questionRegex = /^(\d.)./;
    const optionRegex = /^([A-E]\.)\s/gm;
    const questionMatch = answer.trim().match(questionRegex)
    const impQuestionRegex = /^(\d.).|^(IMP\>+)(\d+\.)/
    const impQuestionMatch = answer.trim().match(impQuestionRegex)

    if (questionMatch) {
      const result = {
        questionId: questionMatch[0].replace('.', ''),
        isImportant: false,
        correctAnswers: []
      }
      const optionMatch = answer.match(optionRegex)
      if (optionMatch) {
        const correctAnswers = new Set(optionMatch.map((option) => {
          return option.replace('. ', '')
        }))
        result['correctAnswers'] = Array.from(correctAnswers);
      }
      return result;
    }

    if (impQuestionMatch) {
      const result = {
        questionId: impQuestionMatch[3].replace('.', ''),
        isImportant: true,
        correctAnswers: []
      }
      const optionMatch = answer.match(optionRegex)
      if (optionMatch) {
        const correctAnswers = new Set(optionMatch.map((option) => {
          return option.replace('. ', '')
        }))
        result['correctAnswers'] = Array.from(correctAnswers);
      }
      return result;
    }
  }).filter((a) => a)
  fs.writeFileSync('./answer51185.json', JSON.stringify(ans51185, null, 2));
}

const parse3 = () => {
  const answersText = fs.readFileSync('./parser/answers186.txt', { encoding: 'utf-8' })
  const answers = answersText.split('------------------------------')
  const answers186 = answers.map((answer) => {
    const questionRegex = /(\d+\])/;
    const optionRegex = /^([A-E]\.)\s/gm;
    const questionMatch = answer.match(questionRegex);
    const optionMatch = answer.match(optionRegex);
    if (questionMatch) {
      const questionId = questionMatch[1].replace(']', '').trim();
      const result = {
        questionId,
        explanation: answer.trim(),
        correctAnswers: [],
        isImportant: false
      }

      if (optionMatch) {
        const correctAnswers = new Set(optionMatch.map((option) => {
          return option.replace('. ', '')
        }))
        result['correctAnswers'] = Array.from(correctAnswers);
      }

      return result;
    }
  }).filter((a) => a)
  fs.writeFileSync('./answers186.json', JSON.stringify(answers186, null, 2));
}

const combine = () => {
  const file1 = JSON.parse(fs.readFileSync('./answers50.json', { encoding: 'utf-8' }))
  const file2 = JSON.parse(fs.readFileSync('./answer51185.json', { encoding: 'utf-8' }))
  const file3 = JSON.parse(fs.readFileSync('./answers186.json', { encoding: 'utf-8' }))

  const allCombined = [
    ...file1,
    ...file2,
    ...file3
  ]
  return allCombined;
}

const checkAndWrite = () => {
  const allCombined = combine()
  for (var i = 1; i <= 650; i++) {
    const found = allCombined.find((ans) => ans.questionId === `${i}`)
    if (!found) {
      console.log('UNable to find question ', i)
    }
  }
  console.log(allCombined.length)
  fs.writeFileSync('./allAnswers.json', JSON.stringify(allCombined, null, 2));
}

const combineQuestionsWithAnswers = () => {
  const allAnswers = JSON.parse(fs.readFileSync('./allAnswers.json', { encoding: 'utf-8' }))
  const questions = JSON.parse(fs.readFileSync('./app/api/questions.json', { encoding: 'utf-8' }))

  const questionWithAnswers = questions.map((question) => {
    const answer = allAnswers.find((answer) => answer.questionId === question.questionId)
    if (answer)
      return {
        ...question,
        ...answer
      }
    else
      return {
        ...question,
        isImportant: false,
        answers: []
      }
  })
  fs.writeFileSync('./app/api/questionWithAnswers.json', JSON.stringify(questionWithAnswers, null, 2));
}


// parse1()
// parse2();
// parse3();

// checkAndWrite();
combineQuestionsWithAnswers()
