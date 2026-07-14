document.addEventListener('DOMContentLoaded', () => {
  const conditionData = {
    score: 82,
    sleepHours: 7.5,
    weight: 67.8,
    heartRate: 58,
    sleepQuality: 4
  };

  renderScore(conditionData.score);
});

function renderScore(score){
  const scoreEl = document.getElementById('scoreValue');
  if(scoreEl){
    scoreEl.textContent = score;
  }
}