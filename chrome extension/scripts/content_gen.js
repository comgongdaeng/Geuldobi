console.log("content_gen is loaded");

//문장을 드래그한 경우

// content script에서
chrome.runtime.sendMessage({ type: "change_input_value", value: "hello@example.com" });

/**.then(result => {
            console.log("under res:", result);
            if (result == "no data") {
              KoSST(selec_text);
              console.log("됐당");
            } else {
              // getMeaning(res);
              // getSyn(selection);
            }
          }); */


$another.addEventListener('mousedown', (event) => {
    KoSST(selec_text);
    event.stopImmediatePropagation();
  /*
  let res;
    let url = domain +"/models/KoSST?user_sentence=" + selec_text
    console.log("격식 비격식 호출됨");
    fetch(url).then((response) =>response.json())
        .then((data) =>{res = data; console.log(data)});
        machine = res["user_sentence"];
        $dragged.innerText = machine//selec_text;*/
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

  if (applied) {
    init_formal()
    $dragged.innerText = machine;
    applied = false;
    console.log("applied==true")
    event.stopImmediatePropagation();
  }
  else {
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
    const $text = document.getElementsByTagName('div');
    formal.style.display = "none";
    for (let i = 0; i < $text.length; i++) {
      if ($text[i].innerHTML.includes(selec_text)) {
        $text[i].innerHTML = $text[i].innerHTML.replace(selec_text, machine);
        break;
      }
    }
    /*
    const $tooltips = document.getElementsByName("#tooltip");
  while ($tooltips.length > 0) {
    $tooltips[0].parentNode.removeChild($tooltips[0]);
  }
*/
  }
});



/*
///////////////////////////////////
//툴팁 이벤트
function formal_tooltip(){
  let clickedElement = event.target;
  while (clickedElement) {
    if (clickedElement.id === 'formal') {
      event.stopPropagation();
      return;
    }
    clickedElement = clickedElement.parentElement;
  }
  if (!applied) {
    const selection = window.getSelection()
    if (selec_text) {
      $dragged.innerText = response["user_sentence"];//selec_text;

      // 요소에 마우스 진입시 툴팁 보이기
      if (selec_text.trim().length !== 0) {
        isDragging = true;
        formal.style.display = 'block';
        //else tooltip.style.display = 'none';
        // 툴팁을 요소에 추가
        parentElement.append(formal);
      }

  }
  else {//사용자가 적용하기를 누른 후 여백클릭....
    init_formal()
    $dragged.innerText = machine;
    applied = false;
    formal.style.display = 'none';
  }
}}*/
