// ===================================
// TOTONO2 コンディショングラフ画面
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
// LocalStorage取得
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

let score = 75;

if(conditionData.sleep){

    score += Number(conditionData.sleep);

}

if(trainingData.time){

    score += Number(trainingData.time)/20;

}

if(mealData.water){

    score += Number(mealData.water)/500;

}

if(score > 100){

    score = 100;

}

document.getElementById("bestScore").textContent =
    Math.round(score);

// ----------------------------
// 折れ線グラフ
// ----------------------------

new Chart(

document.getElementById("lineChart"),

{

type:"line",

data:{

labels:["月","火","水","木","金","土","日"],

datasets:[{

label:"コンディション",

data:[72,75,70,82,79,88,score],

borderColor:"#2563eb",

backgroundColor:"rgba(37,99,235,.15)",

fill:true,

tension:.4,

borderWidth:3,

pointRadius:5

}]

},

options:{

responsive:true,

plugins:{

legend:{display:false}

},

scales:{

y:{

min:0,

max:100

}

}

}

}

);

// ----------------------------
// 円グラフ
// ----------------------------

new Chart(

document.getElementById("pieChart"),

{

type:"pie",

data:{

labels:[

"睡眠",

"運動",

"食事",

"水分"

],

datasets:[{

data:[

25,

30,

25,

20

]

}]

},

options:{

responsive:true

}

}

);

// ----------------------------
// レーダーチャート
// ----------------------------

new Chart(

document.getElementById("radarChart"),

{

type:"radar",

data:{

labels:[

"睡眠",

"食事",

"運動",

"水分",

"疲労",

"気分"

],

datasets:[{

label:"今週",

data:[

conditionData.sleep || 7,

8,

trainingData.time
? trainingData.time/10
:7,

mealData.water
? mealData.water/300
:7,

conditionData.fatigue
? 6-conditionData.fatigue
:7,

conditionData.mood || 7

],

borderColor:"#2563eb",

backgroundColor:
"rgba(37,99,235,.2)",

pointRadius:4

}]

},

options:{

responsive:true,

scales:{

r:{

min:0,

max:10,

ticks:{

stepSize:2

}

}

}

}

}

);

// ----------------------------
// コンソール
// ----------------------------

console.log("graph.js 読み込み完了");