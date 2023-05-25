const $grammar_x = document.createElement('img');
let grammar_result;
let AllInput
const $grammar_side = document.createElement("div");
$grammar_side.style.display = "none"
$grammar_side.className = "sidebar"

// 실행할 함수 예시
function myFunction() {
    document.querySelector('body').style.paddingRight = "350px";
    //$sidebar.innerText = "<결과 더 보기>";
    $grammar_side.style.display = "block";
    document.querySelector('body').append($grammar_side);
    console.log('컨텐트 스크립트에서 실행할 함수');
  }
  
  // 백그라운드 스크립트로부터 메시지를 받는 리스너
  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === 'executeFunction') {
      myFunction(); // 특정 함수 실행
    }
  });

/*
// 실행할 함수 예시
function myFunction() {
    console.log("컨텐트 스크립트에서 실행할 함수");
}

// 백그라운드 스크립트로부터 메시지를 받는 리스너
chrome.runtime.onMessage.addListener((message, sender, sendResponse)=> {
    if (message.action === 'executeFunction') {
        myFunction(); // 특정 함수 실행
        console.log("메세지 받았다")
    }
});*/
function withoutTag(input) {
    console.log("여기 왔어")

    const withoutTags = input.replace(/<div[^>]*>|<\/div>|<p[^>]*>|<\/p>|<b[^>]*>|<\/b>|<font[^>]*>|<\/font>|<u[^>]*>|<\/u>|<i[^>]*>|<\/i>|<span[^>]*>|<\/span>|&lt;|&gt;|&nbsp;|&amp;|&quot;/gi, '')
    .replace(/<br[^>]*>|<\/p>/g, ' ');


    console.log(withoutTags);
    return withoutTags;
}



async function GrammarCheck(key) {
    if (!gdbPower) {
        return;
    }
    //console.log(key)
    if (key.data == null || key.data == "?" || key.data == "¡" || key.data == "!" || key.data == "." || key.data == "。" || key.data == "¿") {
        AllInput = document.querySelector('[name="body"]');
        console.log(AllInput)
        const processed = withoutTag(AllInput.value);
        let res;
        let url = domain + "/model/KoSC?text=" + processed;
        console.log(url)
        await fetch(url).then((response) => response.json())
            .then((data) => { res = data; console.log(data); grammar_result = data; cleanSidebar(); makeSidebar(res); });

        console.log("this is res:", res)
        return res;
    }


}


$grammar_x.src = "https://cc2022-2071024.s3.ap-northeast-1.amazonaws.com/x-button.png";
$grammar_x.style.float = "right";
$grammar_x.style.width = "16px"; $grammar_x.style.height = "16px";
$grammar_x.style.marginTop = "16px";
$grammar_side.append($grammar_x);

const $more_grammar = document.createElement('div');
$more_grammar.className = "more_title";
$more_grammar.innerText = "맞춤법 결과 보기";
$grammar_side.append($more_grammar);
$grammar_side.append(document.createElement('hr'));

$grammar_x.addEventListener('click', (event) => {
    $grammar_side.style.display = "none";
    event.stopImmediatePropagation();
    document.querySelector('body').style.paddingRight = "0px";
    /*
    while ($grammar_side.firstChild) {
          $grammar_side.removeChild($grammar_side.firstChild);
      }*/
});

function cleanSidebar() {
    while ($grammar_side.firstChild) {
        $grammar_side.removeChild($grammar_side.firstChild);
    }
}

function makeSidebar(grammar) {
    $grammar_side.append($grammar_x);
    $grammar_side.append($more_grammar);

    $grammar_side.append(document.createElement('hr'));


    const cnt = parseInt(grammar["results"].length);

    for (let i = 0; i < cnt; i++) {
        console.log("바깥 for")
        //var sidebar = document.querySelector("#sidebar"); // sidebar 요소 선택

        for (let j = 0; j < grammar["results"][i]["differences"].length; j++) {
            console.log("안의  for")
            var $box = document.createElement('div'); // 박스 요소 생성
            $box.className = "sidebar-box"; // 박스에 적용할 클래스

            var $original = document.createElement('div'); $original.className = "dic-meaning";
            $original.innerText = grammar["results"][i]["original_sentence"]
            var $wrong = document.createElement('div'); $wrong.className = "wrong";
            var $correct = document.createElement('div'); $correct.className = "dic-word"
            $box.className = "sidebar-box"
            const $triangle = document.createElement('div');
            $triangle.innerHTML = `<img src="https://cc2022-2071024.s3.ap-northeast-1.amazonaws.com/tri_under.png" style="width:12px; height:12px";>`
            $triangle.style.textAlign = "center";
            //ADD MOD DEL
            if (grammar["results"][i]["differences"][j][0] == "MOD") {
                if (grammar["results"][i]["differences"][j][2] == "." && grammar["results"][i]["differences"][j][3] == ' ') break;
               /* if (grammar["results"][i]["differences"][j][3] == ' ') {
                    $correct.innerText = grammar["results"][i]["differences"][j][1] + grammar["results"][i]["differences"][j][3]+'(띄어쓰기)';
                }
                else*/ $correct.innerText = grammar["results"][i]["differences"][j][1] + grammar["results"][i]["differences"][j][3];
                $wrong.innerText = grammar["results"][i]["differences"][j][1] + grammar["results"][i]["differences"][j][2];
                
            }
            if (grammar["results"][i]["differences"][j][0] == "ADD") {
                $wrong.innerText = grammar["results"][i]["differences"][j][1];
                if (grammar["results"][i]["differences"][j][2] == ' ') {
                    $correct.innerText = grammar["results"][i]["differences"][j][1] + grammar["results"][i]["differences"][j][2]+'(띄어쓰기)';
                }
                else $correct.innerText = grammar["results"][i]["differences"][j][1] + grammar["results"][i]["differences"][j][2];
            }
            if (grammar["results"][i]["differences"][j][0] == "DEL") {
                if (grammar["results"][i]["differences"][j][2] == "." && grammar["results"][i]["differences"][j][3] == null) break;
                $wrong.innerText = grammar["results"][i]["differences"][j][1] + grammar["results"][i]["differences"][j][2];
                $correct.innerText = grammar["results"][i]["differences"][j][1];
            }





            $box.append($original, $wrong, $triangle, $correct); // 박스에 요소 추가
            $grammar_side.appendChild($box); // 사이드바에 박스 추가
        }


        //$sidebar.append(document.createElement('hr'));
    }
}

document.addEventListener("input", (key) => { GrammarCheck(key) })