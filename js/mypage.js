/* ===================================
   MYPAGE画面 JS
=================================== */


document.addEventListener(
"DOMContentLoaded",
()=>{



// ======================
// 今日の日付表示
// ======================


const today =
document.getElementById(
"today"
);



const date =
new Date();



if(today){


today.textContent =
`${date.getFullYear()}年${date.getMonth()+1}月${date.getDate()}日`;


}






// ======================
// ユーザー情報
// （あとでDB接続）
// ======================



const userData = {


name:"ユーザー",

sport:"サッカー",

goal:"体調管理",

recordDays:30,

achievement:"85%",

sleep:"7h"



};






// ======================
// 表示更新
// ======================



const profileName =
document.querySelector(
".profile-info h2"
);



const profileText =
document.querySelector(
".profile-info p"
);



if(profileName){

profileName.textContent =
userData.name;

}



if(profileText){

profileText.textContent =
"コンディション管理中";


}






// プロフィール情報


const infoItems =
document.querySelectorAll(
".info-list span"
);



if(infoItems.length >= 3){



infoItems[0].textContent =
userData.sport;



infoItems[1].textContent =
userData.goal;



infoItems[2].textContent =
userData.recordDays+"日";



}







// ======================
// サマリー
// ======================



const summary =
document.querySelectorAll(
".summary-grid strong"
);



if(summary.length >= 3){



summary[0].textContent =
userData.recordDays;



summary[1].textContent =
userData.achievement;



summary[2].textContent =
userData.sleep;



}









// ======================
// 設定メニュー
// ======================


const menu =
document.querySelectorAll(
".menu-card a"
);



menu.forEach(
(item)=>{


item.addEventListener(
"click",
(e)=>{


e.preventDefault();



alert(
"設定画面は準備中です"
);



}

);


});







});