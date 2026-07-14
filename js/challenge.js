document.addEventListener(
"DOMContentLoaded",
()=>{


const checks =
document.querySelectorAll(
".challenge-item input"
);


const percent =
document.getElementById(
"percent"
);


const circle =
document.querySelector(
".circle"
);


const saveBtn =
document.getElementById(
"saveBtn"
);




function update(){


let count=0;


checks.forEach(
(check)=>{

if(check.checked){

count++;

}

});



let rate =
Math.round(
(count/checks.length)*100
);



percent.textContent =
rate+"%";



circle.style.background =
`
conic-gradient(
#2563eb ${rate*3.6}deg,
#e5e7eb ${rate*3.6}deg
)
`;

}



checks.forEach(
(check)=>{

check.addEventListener(
"change",
update
);

});





saveBtn.addEventListener(
"click",
()=>{


alert(
"目標を保存しました！"
);


});




update();



});