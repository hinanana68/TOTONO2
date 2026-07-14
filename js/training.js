document.addEventListener('DOMContentLoaded', () => {
  setupStars();
  setupRpe();
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

// RPE（運動強度）スケール 1〜10
function setupRpe(){
  const descMap = {
    1:'非常に楽', 2:'楽', 3:'ややきつい', 4:'ややきつい',
    5:'きつい', 6:'きつい', 7:'かなりきつい', 8:'かなりきつい',
    9:'非常にきつい', 10:'限界'
  };

  document.querySelectorAll('.rpe-numbers').forEach(group => {
    const nums = group.querySelectorAll('.rpe-num');
    nums.forEach((n, idx) => {
      n.addEventListener('click', () => {
        nums.forEach((x, i) => x.classList.toggle('active', i <= idx));
        group.nextElementSibling.textContent = (idx + 1) + '：' + descMap[idx + 1];
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
      content: document.querySelector('.text-input input').value,
      duration: document.getElementById('duration').value,
      rpe: document.querySelectorAll('.rpe-num.active').length,
      postFatigue: document.querySelectorAll('[data-group="postFatigue"] .star.filled').length,
      memo: document.querySelector('textarea').value
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