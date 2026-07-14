/* ===================================
   CALENDAR画面 JS
=================================== */


document.addEventListener(
"DOMContentLoaded",
()=>{


// ======================
// 今日の日付表示
// ======================


const todayText =
document.getElementById("today");


const now =
new Date();


todayText.textContent =
`${now.getFullYear()}年${now.getMonth()+1}月${now.getDate()}日`;





// ======================
// カレンダー設定
// ======================


let currentDate =
new Date();



const title =
document.getElementById(
"calendarTitle"
);



const daysArea =
document.getElementById(
"calendarDays"
);





// 記録データ（仮）
// 後でSQLiteへ変更

const records = {


"2026-7-1":{

sleep:"7時間",
water:"2000ml",
mood:"😊",
fatigue:"★★★"

},


"2026-7-5":{

sleep:"8時間",
water:"1800ml",
mood:"😁",
fatigue:"★★"

},


"2026-7-10":{

sleep:"6時間",
water:"1500ml",
mood:"😐",
fatigue:"★★★★"

}


};







// ======================
// カレンダー表示
// ======================


function renderCalendar(){



daysArea.innerHTML="";



const year =
currentDate.getFullYear();


const month =
currentDate.getMonth();




title.textContent =
`${year}年${month+1}月`;





// 月初曜日

const firstDay =
new Date(
year,
month,
1
).getDay();




// 月末日

const lastDate =
new Date(
year,
month+1,
0
).getDate();






// 空白

for(
let i=0;
i<firstDay;
i++
){


const empty =
document.createElement("div");


daysArea.appendChild(
empty
);


}







// 日付作成


for(
let day=1;
day<=lastDate;
day++
){



const date =
document.createElement("div");



date.textContent =
day;





// 今日

if(

year === now.getFullYear()
&&
month === now.getMonth()
&&
day === now.getDate()

){

date.classList.add(
"today"
);

}





// 記録ありチェック


const key =
`${year}-${month+1}-${day}`;



if(records[key]){


date.classList.add(
"has-record"
);


}






// クリック


date.addEventListener(
"click",
()=>{


// 選択表示

document
.querySelectorAll(
".selected"
)
.forEach(
(item)=>{

item.classList.remove(
"selected"
);

});


date.classList.add(
"selected"
);





showRecord(
key
);



}

);





daysArea.appendChild(
date
);



}




}









// ======================
// 記録表示
// ======================


function showRecord(date){



const data =
records[date];



const sleep =
document.getElementById(
"sleep"
);



const water =
document.getElementById(
"water"
);



const mood =
document.getElementById(
"mood"
);



const fatigue =
document.getElementById(
"fatigue"
);





if(data){



sleep.textContent =
data.sleep;



water.textContent =
data.water;



mood.textContent =
data.mood;



fatigue.textContent =
data.fatigue;



}

else{



sleep.textContent =
"-";

water.textContent =
"-";

mood.textContent =
"-";

fatigue.textContent =
"-";



}



}








// ======================
// 月変更
// ======================



document
.getElementById(
"prevMonth"
)
.addEventListener(
"click",
()=>{


currentDate.setMonth(
currentDate.getMonth()-1
);


renderCalendar();


});






document
.getElementById(
"nextMonth"
)
.addEventListener(
"click",
()=>{


currentDate.setMonth(
currentDate.getMonth()+1
);


renderCalendar();


});







// 初期表示

renderCalendar();


});