console.log("content_word is loaded");

  //init 함수에 넣어서 되돌리기
  function word_init() {
    syn.style.height = "auto";
  $more.style.display= "block";    $br.style.display = "block"; $dic_more.style.display = "block"; $meaningContainer.style.display = "block";
    $rec_title.style.display="none"; $rec1.style.display="none"; $rec2.style.display="none"; $rec3.style.display="none"; $rec_another.style.display="none";
    $rec1.innerHTML = `<div style ="text-align:center";>
  <img src = "https://cc2022-2071024.s3.ap-northeast-1.amazonaws.com/ZKZg.gif" style = "width:16px; height:16px;">
    </div>`;
    $rec2.innerHTML = `<div style ="text-align:center";>
  <img src = "https://cc2022-2071024.s3.ap-northeast-1.amazonaws.com/ZKZg.gif" style = "width:16px; height:16px;">
  </div>`;
  $rec3.innerHTML = `<div style ="text-align:center";>
  <img src = "https://cc2022-2071024.s3.ap-northeast-1.amazonaws.com/ZKZg.gif" style = "width:16px; height:16px;">
  </div>`;

  }
  word_init()

  
  syn.append($title_w, $target, $meaningContainer, $dic_more, $more, $br, $rec_title, $rec1, $rec2, $rec3, $rec_another);//, $another, $apply


  $title_w.className += " non-draggable"; //클래스 이름이 붙는 에러 발생하여 공백 추가하였음
  $target.className = "non-draggable";




const $x_btn = document.createElement('img');
const $sidebar = document.createElement('div'); $sidebar.id = "sidebar"; 

//sidebar
$dic_more.addEventListener('mousedown', (event)=>{
  event.stopImmediatePropagation();
  console.log("clicked!!!!!!")
  document.querySelector('body').style.paddingRight = "350px";
  $sidebar.innerText = "결과 더 보기";
  $sidebar.style.display = "block";
  document.querySelector('body').append($sidebar);
  
  const cnt = parseInt(dic_result["items"].length);
  
  $x_btn.src = "https://cc2022-2071024.s3.ap-northeast-1.amazonaws.com/x-button.png";
  $x_btn.style.float = "right";
  $x_btn.style.width = "16px"; $x_btn.style.height = "16px";
  $sidebar.append($x_btn);
  for(let i = 0;i<cnt;i++) {
    const $sup_no = document.createElement('div');
    const $definition = document.createElement('div');
    const $word = document.createElement('div');
    const $pos = document.createElement('div');
    $word.className = "dic_word";
    $word.innerText = dic_result["items"][i]["word"]
    $definition.innerText = dic_result["items"][i]["definition"];
    $definition.className = "dic_meaning";
    $sup_no.innerText = dic_result["items"][i]["sup_no"];
    $sup_no.className = "sup_no";
    $pos.innerText = dic_result["items"][i]["pos"];
    $pos.className = "pos";

    $sidebar.append($word, $sup_no, $pos);
    $sidebar.append($definition);
    $sidebar.append(document.createElement('hr'));
  }
});

$x_btn.addEventListener('click', (event)=> {
  $sidebar.style.display = "none";
  event.stopImmediatePropagation();
  document.querySelector('body').style.paddingRight = "0px";
  while ($sidebar.firstChild) {
        $sidebar.removeChild($sidebar.firstChild);
    }
});

let synonyms;
async function getSyn(selection) {
  let anchorNode = selection.anchorNode;
  let obj
  if (!selection || !anchorNode) return "";
  
    let sentenceStart = anchorNode.textContent.lastIndexOf(".", selection.anchorOffset) + 1;
    let sentenceEnd = anchorNode.textContent.indexOf(".", selection.focusOffset, sentenceStart) + 1;
    sentenceEnd = sentenceEnd < sentenceStart ? anchorNode.textContent.length : sentenceEnd;
  
    let sentence = anchorNode.textContent.substring(sentenceStart, sentenceEnd).trim();
  
    // 선택한 단어를 [MASK]로 치환
    let selectedWord = selection.toString().trim();
    //sentence = sentence.replace(selectedWord, "[MASK]");

  let url = domain +"/model/WordRec?user_sentence=" +sentence+ "&MaskWord="+selectedWord
  console.log("sentence: ", sentence);
  console.log("MaskWord: ", selectedWord);
  if(sentence){
  await fetch(url).then((response) => response.json())
      .then((data) => {synonyms= data; console.log(data)});
  if(synonyms["rec_result"][0]) $rec1.innerHTML = `<img class=triangle style="width:16px; height:15px";> ` + synonyms["rec_result"][0];
  if(synonyms["rec_result"][1]) $rec2.innerHTML = `<img class=triangle style="width:16px; height:15px";> `+ synonyms["rec_result"][1];
  if(synonyms["rec_result"][2]) $rec3.innerHTML = `<img class=triangle style="width:16px; height:15px";> `+ synonyms["rec_result"][2];
  } 
}


// $rec_another.addEventListener("mouseover", ()=>{
//   $rec_another.style.backgroundColor = "#11714d"
//   $rec_another.style.color = "white"
// });

// $rec_another.addEventListener("mouseleave", ()=>{
//   $rec_another.style.backgroundColor = "white"
//   $rec_another.style.color = "black"
// });

$rec_another.addEventListener("mousedown", (event)=>{
  if($rec1.innerHTML.includes(synonyms["result1"][0])) {
    $rec1.innerHTML += synonyms["result2"][0];
  $rec2.innerHTML += synonyms["result2"][1];
  $rec3.innerHTML += synonyms["result2"][2];
  }
  if($rec1.innerHTML.includes(synonyms["result2"][0])) {
    $rec1.innerHTML += synonyms["result3"][0];
  $rec2.innerHTML += synonyms["result3"][1];
  $rec3.innerHTML += synonyms["result3"][2];
  }
  if($rec1.innerHTML.includes(synonyms["result3"][0])){
  $rec1.innerHTML += synonyms["result1"][0];
  $rec2.innerHTML += synonyms["result1"][1];
  $rec3.innerHTML += synonyms["result1"][2];
  }
});

function apply_w(suggestion) {
  syn.style.display = "none";
    word_init();
    console.log("clicked....")
    if(parentElement.innerText.includes($target.innerText)) {
      parentElement.innerHTML = parentElement.innerHTML.replace($target.innerText, suggestion)
    }
}

  $rec1.addEventListener("mousedown", (event)=>{
    apply_w($rec1.innerText);
    event.stopImmediatePropagation();
  });

  $rec2.addEventListener("mousedown", (event)=>{
    apply_w($rec2.innerText);
    event.stopImmediatePropagation();
  });

  $rec3.addEventListener("mousedown", (event)=>{
    apply_w($rec3.innerText);
    event.stopImmediatePropagation();
  });

  $more.addEventListener("mousedown", (event)=>{
    //ROBERTA URL
    
    syn.style.height = "auto";
    $more.style.display= "none";
    $br.style.display = "none";
    //$rec1.innerHTML = `<img class=triangle style="width:16px; height:16px";>`;
    //$rec2.innerHTML = `<img class=triangle style="width:16px; height:16px";>`;
    //$rec3.innerHTML = `<img class=triangle style="width:16px; height:16px";>`;
    $rec_title.style.display="block"; $rec1.style.display="block"; $rec2.style.display="block"; $rec3.style.display="block"; $rec_another.style.display="block";
    //syn.append();
    
    

    //event.stopImmediatePropagation();
    event.stopPropagation();

  });


 /* more 버튼 padding 클릭 시에만 작동하던 이유가 아래 이벤트와 겹쳐서 그런 것 같아 주석처리하였습니다.

  $more.addEventListener("mouseover", ()=>{
    $more.innerHTML = `<div><span> 유의어/동의어 추천 </span><img src = "https://cc2022-2071024.s3.ap-northeast-1.amazonaws.com/more_green.png" style="width:16px; height:16px;">
  </div>`
  });
  $more.addEventListener("mouseleave", ()=>{
    $more.innerHTML = `<div><span> 유의어/동의어 추천 </span><img src = "https://cc2022-2071024.s3.ap-northeast-1.amazonaws.com/more.png" style="width:16px; height:16px;">
  </div>`
  });
*/

