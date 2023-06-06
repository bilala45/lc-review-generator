import questions from "./getQuestions.js";

// number of questions acts as boundaries for random number generation
const max = questions.length;
const randomInt = Math.floor(Math.random() * max);
const randQuestion = questions[randomInt];

export default randQuestion;
