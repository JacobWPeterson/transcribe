import { longMessage, shortMessage } from './constants.js';

const evaluateSubmission = (guess, answer, requireSpaces) => {
  const reformattedAnswer = requireSpaces ? answer : answer.replace(/\s/g, '')
  const reformattedGuess = requireSpaces ? guess.replace(/ς|ϲ/gi, 'σ').toLowerCase() : guess.replace(/\s/g, '').replace(/ς|ϲ/gi, 'σ').toLowerCase();

  if (reformattedGuess.length === reformattedAnswer.length) {
    return [reformattedGuess === reformattedAnswer, reformattedGuess === reformattedAnswer ? 'correct' : 'Answer is incorrect.'];
  }
  if (reformattedGuess.length < reformattedAnswer.length) {
    return [false, shortMessage(reformattedAnswer.length - reformattedGuess.length)];
  }
  return [false, longMessage(reformattedGuess.length - reformattedAnswer.length)];
};

export default evaluateSubmission;
