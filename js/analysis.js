// ===================================
// TOTONO2 分析・推移画面
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
// データ取得
// ----------------------------

const conditionData =
    JSON.parse(localStorage.getItem("conditionData")) || {};

const trainingData =
    JSON.parse(localStorage.getItem("trainingData")) || {};

const mealData =
    JSON.parse(localStorage.getItem("mealData")) || {};

// ----------------------------
// スコア計算
// ----------------------------

let score = 60;

// 睡眠
if (conditionData.sleep) {

    const sleep = Number(conditionData.sleep);

    if (sleep >= 7) {

        score += 10;

    } else {

        score += 5;

    }

}

// 水分
if (mealData.water) {

    const water = Number(mealData.water);

    if (water >= 2000) {

        score += 10;

    } else {

        score += 5;

    }

}

// トレーニング

if (trainingData.time) {

    const time = Number(trainingData.time);

    if (time >= 60) {

        score += 10;

    } else {

        score += 5;

    }

}

// 疲労度

if (conditionData.fatigue) {

    score += (6 - Number(conditionData.fatigue));

}

// 上限

if (score > 100) {

    score = 100;

}

// ----------------------------
// スコア表示
// ----------------------------

const totalScore =
    document.getElementById("totalScore");

if (totalScore) {

    totalScore.textContent = score;

}

// ----------------------------
// AIコメント
// ----------------------------

const aiComment =
    document.getElementById("aiComment");

if (aiComment) {

    let message = "";

    if (score >= 90) {

        message =
            "絶好調です！✨<br>今の生活リズムを維持しましょう！";

    }

    else if (score >= 80) {

        message =
            "コンディションは良好です😊<br>引き続き睡眠と食事を意識しましょう！";

    }

    else if (score >= 70) {

        message =
            "少し疲労が見られます😌<br>今日はストレッチと休養を取り入れましょう。";

    }

    else {

        message =
            "疲労が溜まっています😢<br>十分な睡眠と水分補給を心掛けましょう。";

    }

    aiComment.innerHTML = message;

}

// ----------------------------
// Chart.js
// ----------------------------

const ctx =
document.getElementById("conditionChart");

if (ctx) {

new Chart(ctx, {

    type: "line",

    data: {

        labels: [

            "月",

            "火",

            "水",

            "木",

            "金",

            "土",

            "日"

        ],

        datasets: [

            {

                label: "コンディション",

                data: [

                    70,

                    75,

                    73,

                    82,

                    78,

                    85,

                    score

                ],

                borderColor: "#2563eb",

                backgroundColor:
                    "rgba(37,99,235,.15)",

                borderWidth: 3,

                fill: true,

                tension: .4,

                pointRadius: 5,

                pointBackgroundColor:
                    "#2563eb"

            }

        ]

    },

    options: {

        responsive: true,

        plugins: {

            legend: {

                display: false

            }

        },

        scales: {

            y: {

                min: 0,

                max: 100

            }

        }

    }

});

}

// ----------------------------
// 分析カード更新
// ----------------------------

const analysisItems =
    document.querySelectorAll(".analysis-item strong");

if (analysisItems.length >= 4) {

    analysisItems[0].textContent =
        conditionData.sleep
        ? `${conditionData.sleep}時間`
        : "--";

    analysisItems[1].textContent =
        mealData.breakfast ||
        mealData.lunch ||
        mealData.dinner
        ? "入力済"
        : "--";

    analysisItems[2].textContent =
        trainingData.time
        ? `${trainingData.time}分`
        : "--";

    analysisItems[3].textContent =
        mealData.water
        ? `${mealData.water}ml`
        : "--";

}

console.log("分析画面 読み込み完了");