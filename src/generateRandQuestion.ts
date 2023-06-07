// number of questions acts as boundaries for random number generation
export const generateRandQuestion = (questions: string[]): string => {
  const max = questions.length;
  const randomInt = Math.floor(Math.random() * max);
  return questions[randomInt];
};
