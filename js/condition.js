// ===================================
// TOTONO2 コンディション入力画面
// ===================================

// ----------------------------
// 今日の日付を表示
// ----------------------------

const today = document.getElementById("today");

if (today) {

    const now = new Date();

    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const date = now.getDate();

    today.textContent = `${year}年${month}月${date}日`;

}

// ----------------------------
// 気分選択
// ----------------------------

const moodButtons = document.querySelectorAll(".mood-btn");

let selectedMood = 3;

moodButtons.forEach(button => {

    button.addEventListener("click", () => {

        moodButtons.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        selectedMood = button.dataset.value;

    });

});

// ----------------------------
// 疲労度選択
// ----------------------------

const stars = document.querySelectorAll(".star");

let fatigue = 3;

stars.forEach((star, index) => {

    star.addEventListener("click", () => {

        fatigue = index + 1;

        stars.forEach((item, i) => {

            if (i <= index) {

                item.classList.add("active");

            } else {

                item.classList.remove("active");

            }

        });

    });

});

// ----------------------------
// 保存ボタン
// ----------------------------

const saveBtn = document.getElementById("saveBtn");

saveBtn.addEventListener("click", () => {

    const sleep = document.getElementById("sleep").value;

    const water = document.getElementById("water").value;

    const condition = document.getElementById("condition").value;

    const memo = document.getElementById("memo").value;

    // 必須チェック
    if (sleep === "" || water === "") {

        alert("睡眠時間と水分摂取量を入力してください。");

        return;

    }

    // データ作成
    const conditionData = {

        date: new Date().toLocaleDateString(),

        sleep: sleep,

        water: water,

        mood: selectedMood,

        fatigue: fatigue,

        condition: condition,

        memo: memo

    };

    // LocalStorageへ保存
    localStorage.setItem(
        "conditionData",
        JSON.stringify(conditionData)
    );

    console.log(conditionData);

    alert("保存しました！😊");

});

// ----------------------------
// 前回データがあれば表示
// ----------------------------

const savedData = JSON.parse(
    localStorage.getItem("conditionData")
);

if (savedData) {

    document.getElementById("sleep").value = savedData.sleep;

    document.getElementById("water").value = savedData.water;

    document.getElementById("condition").value = savedData.condition;

    document.getElementById("memo").value = savedData.memo;

    selectedMood = savedData.mood;

    moodButtons.forEach(btn => {

        btn.classList.remove("active");

        if (btn.dataset.value == selectedMood) {

            btn.classList.add("active");

        }

    });

    fatigue = savedData.fatigue;

    stars.forEach((star, index) => {

        if (index < fatigue) {

            star.classList.add("active");

        } else {

            star.classList.remove("active");

        }

    });

}