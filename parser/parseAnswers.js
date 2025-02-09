const fs = require('fs');

const parse = () => {
  const answersText = fs.readFileSync('./parser/answers.txt', { encoding: 'utf-8' })
  console.log(answersText);
}

parse()