document.addEventListener('DOMContentLoaded', () => {
  setupStars();
  setupMood();
  setupSaveButton();
});

// ★評価（クリックした位置まで塗りつぶす）
function setupStars(){
  document.querySelectorAll('.stars').forEach(group => {
    const stars = group.querySelectorAll('.star');
    stars.forEach((star, idx) => {
      star.addEventListener('click', () => {
        stars.forEach((s, i) => {
          s.classList.toggle('filled', i <= idx);
        });
      });
    });
  });
}

// 気分の絵文字選択
function setupMood(){
  document.querySelectorAll('.mood-row').forEach(group => {
    const moods = group.querySelectorAll('.mood');
    moods.forEach(m => {
      m.addEventListener('click', () => {
        moods.forEach(x => x.classList.remove('selected'));
        m.classList.add('selected');
      });
    });
  });
}

// 保存ボタン
function setupSaveButton(){
  const btn = document.getElementById('saveBtn');
  if(!btn) return;

  btn.addEventListener('click', () => {
    const data = {
      sleepHours: document.getElementById('sleepH').value,
      sleepMinutes: document.getElementById('sleepM').value,
      weight: document.getElementById('weight').value,
      temperature: document.getElementById('temp').value,
      sleepQuality: document.querySelectorAll('[data-group="sleepQ"] .star.filled').length,
      fatigue: document.querySelectorAll('[data-group="fatigue"] .star.filled').length,
      mood: document.querySelector('.mood.selected')?.dataset.val
    };
    console.log('保存データ:', data);
    showToast();
  });
}

function showToast(){
  const t = document.getElementById('toastEl');
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 1800);
}