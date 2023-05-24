console.log("content is loaded");
const formal = document.createElement("span"); formal.id = "formal";
const $title = document.createElement("p"); $title.className = "title";//$title.id = "title";
const $dragged = document.createElement("p"); $dragged.id = "dragged";
const $draggedContainer = document.createElement("div"); $draggedContainer.className = "container"; $draggedContainer.id = "draggedContainer";

$draggedContainer.appendChild($dragged);

const $another = document.createElement("button"); $another.id = "another";
const $apply = document.createElement("button"); $apply.id = "apply";


const syn = document.createElement("span"); syn.id = "syn";// tooltip.className = "syn";
  const $title_w = document.createElement("p"); $title_w.className = "title";//$title.id = "title"; 
  const $target = document.createElement("p"); $target.id = "target";


  const $meaning = document.createElement("p"); $meaning.id = "meaning";
  const $meaningContainer = document.createElement("div"); $meaningContainer.className = "container"; $meaningContainer.id ="meaningContainer";
  $meaningContainer.style.overflow = "auto";
  $meaningContainer.style.maxHeight = "auto"; 
  $meaningContainer.appendChild($meaning);

  const $more = document.createElement("button"); $more.id = "more";
  const $dic_more = document.createElement("p"); $dic_more.id = "dic_more";

  const $rec_title = document.createElement("p"); /*$rec_title.className = "title"; */$rec_title.id = "rec_title";
  const $rec1 = document.createElement("p"); $rec1.id = "rec1"; $rec1.className = "words";
  const $rec2 = document.createElement("p"); $rec2.id = "rec2"; $rec2.className = "words";
  const $rec3 = document.createElement("p"); $rec3.id = "rec3"; $rec3.className = "words";
  const $rec_another = document.createElement("button"); $rec_another.id = "rec_another";
  $rec_title.innerHTML = "<strong> 유의어/동의어 추천 </strong>";
  const $br = document.createElement("br");
  $title_w.innerHTML = "<strong> 단어 뜻 </strong>";
  $meaning.innerHTML = `<div style ="text-align:center";>;
  <img src = "https://cc2022-2071024.s3.ap-northeast-1.amazonaws.com/ZKZg.gif" style = "width:16px; height:16px;">;
  </div>`;
  $more.innerHTML = `<div id = "morebtn">  <span> 유의어/동의어 추천 </span>  <img class=morebtn style="width:16px; height:16px;">
</div>`;
  $rec_another.innerHTML = `<div><img class=again  style="width:16px; height:16px;"><span>다른 추천 단어 보기</span></div>`;
$rec_another.style.cursor = "pointer";
$dic_more.innerText = "검색 결과 더 보기☞";

const grammar = document.createElement("span"); grammar.id = "grammar";
const $correct = document.createElement("p"); $correct.id = "correct";
const $dismiss = document.createElement("p"); $dismiss.id = "dismiss";
$correct.innerHTML ="감사합니다"; $dismiss.innerHTML =`<img src = "https://cc2022-2071024.s3.ap-northeast-1.amazonaws.com/trash.png" style = "width:16px; height:16px;"> 무시하기`;
const $gr_title = document.createElement("p"); $gr_title.className = "title";
$gr_title.innerHTML = "<strong> 맞춤법 제안 </strong>"
grammar.append($gr_title, $correct, $dismiss);//수정

const domain= "https://geuldobi.kro.kr"

let gdbPower = true;

chrome.storage.onChanged.addListener(function (changes, areaName) {
  if (areaName === 'sync' && changes.isChecked) {
    var newIsChecked = changes.isChecked.newValue;
    console.log('isChecked 값 변경됨:', newIsChecked);
    if (newIsChecked){
      gdbPower = true;
    }
    else{
      gdbPower = false;
    }
  }
});

let dic_result;

//글도비 ON-OFF 동작 popup.js로 부터 메세지 받음
// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//   if (request.action === "enableFunction") {
//     OnOFF();
//   } else if (request.action === "disableFunction") {
//     OnOFF();
//   }
// });

// function OnOFF() {
//   if (gdbPower){
//     gdbON = false;
//     console.log(gdbON);
//   }
//   else{
//     gdbPower = true;
//     console.log(gdbON);
//   }
// }


async function isSentence(selec_text){
  if (!gdbPower) {
    return;
  }

    let res;
    let url = domain+"/isSentence?user_input=" + selec_text;
        console.log(url)
        await fetch(url).then((response) => response.json())
          .then((data) => { res = data; console.log(data); dic_result = res;});
        if (res =="no data") {res = res.toString(); }
        console.log("this is res:", res)
    return res;

}

//드래그->문장일 경우
async function KoSST(selec_text){
  if (!gdbPower) {
    return;
  }

    init_formal();
    let res;
    let url = domain +"/model/KoSST?user_sentence=" + selec_text
    console.log("격식 비격식 호출됨");
    await fetch(url).then((response) => response.json())
        .then((data) => {res = data; console.log(data)});
        machine = res["user_sentence"];
        $dragged.innerText = machine//selec_text;
        
}


$correct.addEventListener("mouseover", ()=>{
    $correct.style.backgroundColor = "#11714d";
    $correct.style.color = "white";
})

$correct.addEventListener("mouseleave", ()=>{
    $correct.style.backgroundColor = "white";
    $correct.style.color = "black";
})

$dismiss.addEventListener("mouseover", ()=>{
    $dismiss.style.backgroundColor = "#11714d";
    $dismiss.style.color = "white";
})

$dismiss.addEventListener("mouseleave", ()=>{
    $dismiss.style.backgroundColor = "white";
    $dismiss.style.color = "black";
})

function addUnderline() {
  if (!gdbPower) {
    return;
  }

  const divs = document.body.getElementsByTagName("div");
  for (let i = 0; i < divs.length; i++) {
    const div = divs[i];
    if (div.innerHTML.includes("감사하빈다")) {
      div.innerHTML = div.innerHTML.replace(/감사하빈다/g, '<span id="wrong">감사하빈다</span>');

      const wrongSpan = div.querySelector("#wrong");
      wrongSpan.style.textDecoration = "underline red";
      wrongSpan.style.cursor = "pointer";
      wrongSpan.addEventListener("click", function() {
        grammar.style.display = "block";
        wrongSpan.append(grammar);
      });
    }
  }
}

document.addEventListener("input", ()=>{addUnderline()})


$correct.addEventListener("mousedown", (event) => {
  if (!gdbPower) {
    return;
  }
    event.stopImmediatePropagation();
    grammar.style.display = "none";
    const $gamsa = document.getElementsByTagName('div');
    
    for (let i = 0; i < $gamsa.length; i++) {
      if ($gamsa[i].innerHTML.includes(`<span id="wrong">감사하빈다</span>`)) {
        document.querySelector("#wrong").style.textDecoration = "none";
        $gamsa[i].innerHTML = $gamsa[i].innerHTML.replace(`<span id="wrong">감사하빈다</span>`, "감사합니다");
        break;
      }
    }
  

});

//드래그-> 단어일 경우
function getMeaning(res) {   
  if (!gdbPower) {
    return;
  }
 
  word_init()
    $target.innerText = selec_text;
    console.log("getMeaning selec",selec_text)
    console.log(res)
    $meaning.innerHTML = "1. "+ res["items"][0]["definition"];
    if(res["total"]>"1")
        $meaning.innerHTML += "<br>2. " + res["items"][1]["definition"];    
    if(res["total"]<"3")
        $dic_more.style.display = "none";    
    
        //word_init()
    //syn.append($title_w, $target, $meaning, $dic_more, $more, $br, $rec_title, $rec1, $rec2, $rec3, $rec_another);
    
    //console.log("여기까지 함")
}

  //마우스다운 이벤트-> 드래그되었는지 아닌지 확인
document.addEventListener("mouseup", function (event) {

  if (!gdbPower) {
    return;
  }

  let clickedElement = event.target;
  while (clickedElement) {
    if (clickedElement.id === 'syn'||clickedElement.id === 'formal'||clickedElement.id === 'grammar') {
      event.stopImmediatePropagation();
      return;
    }
    clickedElement = clickedElement.parentElement;
  }

  const selection = window.getSelection()
  if (selection) {
    const first = selection.getRangeAt(0);
    parentElement = first.commonAncestorContainer.parentElement;
    /*console.log(parentElement.tagName);*/
    selec_text = selection.toString();
  }
      
  if (selec_text) {
    //isSentence
    isSentence(selec_text).then(result => {
      console.log("under res:", result);
      if (result == "no data") {
        KoSST(selec_text);
        console.log("됐당");
          if (selec_text.trim().length !== 0) {
            isDragging = true;
            formal.style.display = 'block';
            formal.style.visibility="visible";
            syn.style.visibility ="hidden";
            syn.style.display="none";
            parentElement.append(formal);
            if (document.getElementById('syn') != null){
              document.getElementById('syn').remove();
              //this.removeChild
              }         
              
          }
      } 
      else {
        let tr = getMeaning(result);
        syn.style.display = "block";
        syn.style.visibility = "visible";
        formal.style.visibility="hidden";
        formal.style.display = 'none';
        parentElement.append(syn);
        if (document.getElementById('formal') != null){
          console.log(document.getElementById('formal'));
          document.getElementById('formal').remove();
        }
        getSyn(selection);
      }
    });
  } 
  else {
    if (document.getElementById('syn') != null){
      document.getElementById('syn').remove();
      //this.removeChild
    } 
    if (document.getElementById('formal') != null){
      console.log(document.getElementById('formal'));
      document.getElementById('formal').remove();
    }
    isDragging = false;
  }        
});


  // 드래그 시작 위치로 툴팁 위치 지정
document.addEventListener('mousedown', (event) => {
  if (!gdbPower) {
    return;
  }
  formal.style.left = event.pageX -150 + 'px';
  formal.style.top = event.pageY -150 + 'px';
  syn.style.left = event.pageX -150+ 'px';
  syn.style.top = event.pageY -150+ 'px';
  grammar.style.left = event.pageX -150+ 'px';
  grammar.style.top = event.pageY -150+ 'px';
  //syn.style.left = event.pageX -600+ 'px';
  //syn.style.top = event.pageY -300+ 'px';


    console.log(event.pageX, event.pageY, event.clientX, event.clientY);

  });
/**    tooltip.style.top = target.getBoundingClientRect().bottom + "px";
    tooltip.style.left = target.getBoundingClientRect().left + "px"; */