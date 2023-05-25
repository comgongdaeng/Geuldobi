console.log("content_gen is loaded");

//문장을 드래그한 경우

// content script에서
chrome.runtime.sendMessage({ type: "change_input_value", value: "hello@example.com" });

$another.addEventListener('mousedown', (event) => {
    KoSST(selec_text);
    event.stopImmediatePropagation();
})

//init 함수에 넣어서 격식/ 비격식 되돌리기 
function init_formal() {
  $title.innerHTML = "<strong> 추천 문장 </strong>";
  $dragged.innerHTML = `<div style ="text-align:center";> 
  <img src = "https://cc2022-2071024.s3.ap-northeast-1.amazonaws.com/ZKZg.gif" style = "width:16px; height:16px;">  </div>`;
  $another.innerHTML = `<div><img src = "https://cc2022-2071024.s3.ap-northeast-1.amazonaws.com/loading_32.png" style="width:16px; height:16px;"><span>다른 문장 추천 받기</span></div>`
  $apply.innerText = "적용하기";
}
init_formal()

formal.append($title, $draggedContainer, $another, $apply);
//$apply.style.alignItems = "center";
$title.className += " non-draggable";
$dragged.className = "non-draggable";
$apply.className = "non-draggable";
let isDragging = false;
let machine;// = "머신 돌려온 값을 이 변수에다 넣을 거야";
let parentElement;
let selec_text;
let applied = false;

$apply.addEventListener("mousedown", (event) => {
/*
  if (applied) {
    init_formal()
    $dragged.innerText = machine;
    applied = false;
    console.log("applied==true")
    event.stopImmediatePropagation();
  }
  else {*/
    event.stopImmediatePropagation();

    $title.innerHTML = "<strong> 원본 문장 </strong>";
    $dragged.innerText = selec_text;
    $apply.innerText = "되돌리기"
    $another.innerHTML = `<div>
 <img src = "https://cc2022-2071024.s3.ap-northeast-1.amazonaws.com/check.png" style="width:16px; height:16px;">
   <span>적용 완료</span>
 </div>`
    console.log("applied==false")
    applied = true;
    formal.style.display = "none";
    //const $text = document.getElementsByTagName('div');
    //const $text_mail = document.querySelector('[role="textbox"]').getElementsByTagName('div');
    //const $test_mail = document.getElementById(':68').getElementsByTagName('div');

    //console.log($test_mail);
    //console.log($test_mail[0].innerHTML);

    const $mail_text_con1 = document.querySelector('.Am.Al').getElementsByTagName("text")

    const $mail_text_con = document.querySelector('.Am.Al')


    //console.log(element1);
    //console.log(element2);
    //console.log($mail_text_con.innerHTML)
    console.log($mail_text_con.innerText);
    console.log("applid 내에서");
    console.log(selec_text);

    //아마도 기존 코드
    // for (let i = 0; i < $text.length; i++) {
    //   if ($text[i].innerHTML.includes(selec_text)) {
    //     $text[i].innerHTML = $text[i].innerHTML.replace(selec_text, machine);
    //     break;
    //   }
    // }

    $mail_text_con.innerText= $mail_text_con.innerText.replace(selec_text, machine);

    // for (let i = 0; i < $mail_text_con.length; i++) {
    //   $mail_text_con.innerText = mail_text_con.replace(selec_text,machine);
    //   if ($mail_text_con[i].innerHTML.includes(selec_text)) {
    //     $mail_text_con[i].innerHTML = $mail_text_con[i].innerHTML.replace(selec_text, machine);
    //     break;
    //   }
    // }
    if (document.getElementById('formal') != null){
      console.log(document.getElementById('formal'));
      document.getElementById('formal').remove();
    }

    /*
    const $tooltips = document.getElementsByName("#tooltip");
  while ($tooltips.length > 0) {
    $tooltips[0].parentNode.removeChild($tooltips[0]);
  }
*/
  //}
});
