// ===================================
// TOTONO2 トレーニング記録画面
// ===================================

// ----------------------------
// 今日の日付
// ----------------------------

const today = document.getElementById("today");

if (today) {

    const now = new Date();

    today.textContent =
        `${now.getFullYear()}年${now.getMonth()+1}月${now.getDate()}日`;

}

// ----------------------------
// 強度選択
// ----------------------------

const intensityButtons = document.querySelectorAll(".intensity-btn");

let selectedIntensity = 3;

intensityButtons.forEach(button => {

    button.addEventListener("click", () => {

        intensityButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        selectedIntensity = Number(button.dataset.value);

    });

});

// ----------------------------
// 満足度選択
// ----------------------------

const stars = document.querySelectorAll(".star");

let rating = 3;

stars.forEach((star, index) => {

    star.addEventListener("click", () => {

        rating = index + 1;

        stars.forEach((item, i) => {

            if(i <= index){

                item.classList.add("active");

            }else{

                item.classList.remove("active");

            }

        });

    });

});

// ----------------------------
// 保存
// ----------------------------

const saveBtn = document.getElementById("saveBtn");

saveBtn.addEventListener("click", () => {

    const trainingType =
        document.getElementById("trainingType").value;

    const trainingTime =
        document.getElementById("trainingTime").value;

    const calorie =
        document.getElementById("calorie").value;

    const memo =
        document.getElementById("memo").value;

    if(trainingType === ""){

        alert("トレーニング種目を選択してください。");

        return;

    }

    if(trainingTime === ""){

        alert("トレーニング時間を入力してください。");

        return;

    }

    const trainingData = {

        date:new Date().toLocaleDateString(),

        type:trainingType,

        time:trainingTime,

        intensity:selectedIntensity,

        rating:rating,

        calorie:calorie,

        memo:memo

    };

    localStorage.setItem(
        "trainingData",
        JSON.stringify(trainingData)
    );

    console.log(trainingData);

    alert("トレーニング記録を保存しました！💪");

});

// ----------------------------
// 前回データ表示
// ----------------------------

const savedData = JSON.parse(
    localStorage.getItem("trainingData")
);

if(savedData){

    document.getElementById("trainingType").value =
        savedData.type;

    document.getElementById("trainingTime").value =
        savedData.time;

    document.getElementById("calorie").value =
        savedData.calorie;

    document.getElementById("memo").value =
        savedData.memo;

    selectedIntensity = savedData.intensity;

    intensityButtons.forEach(button => {

        button.classList.remove("active");

        if(Number(button.dataset.value) === selectedIntensity){

            button.classList.add("active");

        }

    });

    rating = savedData.rating;

    stars.forEach((star,index)=>{

        if(index < rating){

            star.classList.add("active");

        }else{

            star.classList.remove("active");

        }

    });

}