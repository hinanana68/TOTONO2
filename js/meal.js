// ===================================
// TOTONO2 食事管理画面
// ===================================

// ----------------------------
// 今日の日付
// ----------------------------

const today = document.getElementById("today");

if (today) {

    const now = new Date();

    today.textContent =
        `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日`;

}

// ----------------------------
// 保存ボタン
// ----------------------------

const saveBtn = document.getElementById("saveBtn");

saveBtn.addEventListener("click", () => {

    const breakfast = document.getElementById("breakfast").value.trim();
    const lunch = document.getElementById("lunch").value.trim();
    const dinner = document.getElementById("dinner").value.trim();
    const snack = document.getElementById("snack").value.trim();
    const water = document.getElementById("water").value.trim();
    const memo = document.getElementById("memo").value.trim();

    // 必須チェック
    if (
        breakfast === "" &&
        lunch === "" &&
        dinner === ""
    ) {

        alert("朝食・昼食・夕食のどれかを入力してください。");

        return;

    }

    const mealData = {

        date: new Date().toLocaleDateString(),

        breakfast: breakfast,

        lunch: lunch,

        dinner: dinner,

        snack: snack,

        water: water,

        memo: memo

    };

    localStorage.setItem(
        "mealData",
        JSON.stringify(mealData)
    );

    console.log(mealData);

    alert("食事内容を保存しました！🍱");

});

// ----------------------------
// 保存データ読込
// ----------------------------

const savedMeal = JSON.parse(
    localStorage.getItem("mealData")
);

if (savedMeal) {

    document.getElementById("breakfast").value =
        savedMeal.breakfast || "";

    document.getElementById("lunch").value =
        savedMeal.lunch || "";

    document.getElementById("dinner").value =
        savedMeal.dinner || "";

    document.getElementById("snack").value =
        savedMeal.snack || "";

    document.getElementById("water").value =
        savedMeal.water || "";

    document.getElementById("memo").value =
        savedMeal.memo || "";

}

// ----------------------------
// 入力文字数カウント
// ----------------------------

const textareas = document.querySelectorAll("textarea");

textareas.forEach(textarea => {

    textarea.addEventListener("input", () => {

        const length = textarea.value.length;

        console.log(`${textarea.id} : ${length}文字`);

    });

});

// ----------------------------
// Enterキーで保存しない
// ----------------------------

document.addEventListener("keydown", (event) => {

    if (event.key === "Enter" && event.target.tagName !== "TEXTAREA") {

        event.preventDefault();

    }

});