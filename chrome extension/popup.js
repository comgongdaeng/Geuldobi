var temp = true;
const $onsite = document.querySelector('#onsite');

var switch1 = $("#gdbSwitch");
switch1.click(function(){
  $("#gdbOFF, #gdbON").toggle();
});

var switch2 = $("#CorSwitch");
switch2.click(function(){
  $("#CorOFF, #CorON").toggle();
});

var switch3 = $("#formalSwitch");
switch3.click(function(){
  $("#formalOFF, #formalON").toggle();
});

var switch4 = $("#wordrecSwitch");
switch4.click(function(){
  $("#wordrecOFF, #wordrecON").toggle();
});



// var temp = true;
// const $site = document.querySelector('#site');
// const $onsite = document.querySelector('#onsite');
// const $btn2 = document.querySelector('#btn2');
// const $btn3 = document.querySelector('#btn3');
// const $btn4 = document.querySelector('#btn4');

// //$site.textContent = window.location.hostname

// OnOff = () => {
//     if (temp) {

//         $onsite.style.backgroundColor = 'gray';
//         $onsite.style.color = 'black';
//         $onsite.innerText = "끄다";
//         temp = false;
//     } else {
//         $onsite.style.backgroundColor = 'rgb(0, 70, 42)';
//         $onsite.style.color = 'white';
//         $onsite.innerText = "켜다";
//         temp = true;
//     }
// }

// $onsite.addEventListener('click', OnOff())
//     //document.querySelector('#btn2').addEventListener('click', OnOff)
//     //document.querySelector('#btn3').addEventListener('click', OnOff)
//     //document.querySelector('#btn4').addEventListener('click', OnOff) 
