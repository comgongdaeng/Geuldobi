


var temp = true;
const $site = document.querySelector('#site');
const $onsite = document.querySelector('#onsite');
const $btn2 = document.querySelector('#btn2');
const $btn3 = document.querySelector('#btn3');
const $btn4 = document.querySelector('#btn4');

//$site.textContent = window.location.hostname

OnOff = () => {
    if (temp) {

        $onsite.style.backgroundColor = 'gray';
        $onsite.style.color = 'black';
        $onsite.innerText = "끄다";
        temp = false;
    } else {
        $onsite.style.backgroundColor = 'rgb(0, 70, 42)';
        $onsite.style.color = 'white';
        $onsite.innerText = "켜다";
        temp = true;
    }
}

$onsite.addEventListener('click', OnOff())
    //document.querySelector('#btn2').addEventListener('click', OnOff)
    //document.querySelector('#btn3').addEventListener('click', OnOff)
    //document.querySelector('#btn4').addEventListener('click', OnOff) 
