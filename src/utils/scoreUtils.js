const _isGuessCorrect = (character, weekNum, userData) => {
  const userGuess = userData.guesses.find(g => g.name === character.name);

  if( !userGuess ){
    return false;
  }

  const charStatus = character[`week${weekNum}`];
  return charStatus === userGuess.status;
};

const buildUserScores = (masterList, userData, numWeeks) => {
  const scores = [];
  let score;
  let character; 

  for( let w = 1; w <= numWeeks; w++ ){
    score = 0;

    for( let c = 0; c < masterList.length; c++ ){
      character = masterList[c];

      if( _isGuessCorrect(character, w, userData) ){
        score++;
      }
    }
    scores.push(score);
  }

  return scores;
};


const getWeekScore = (weekNum, userList) => {  
  return userList.map(u => {
    return {
      name: u.name,
      guessedDeathCount: u.guessedDeathCount,
      score: u.scores[weekNum-1] || 0,
    };
  });
};

module.exports = {
  buildUserScores,
  getWeekScore,
};
