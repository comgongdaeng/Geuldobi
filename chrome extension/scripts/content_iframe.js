const selected = [,];

function selectText() {
  let selectionText = "";
  if (document.getSelection) {
    selectionText = document.getSelection();
    

  } else if (document.selection) {
    selectionText = document.selection.createRange().text;
  } 
  return selectionText;
}

const tooltip = document.createElement("span");

document.addEventListener("mouseup", function() {
  const selection = window.getSelection()
  
  const first = selection.getRangeAt(0);
  const parentElement = first.commonAncestorContainer.parentElement;
  console.log(parentElement.tagName);
  tooltip.innerText = selection.toString();
  // 요소에 마우스 진입시 툴팁 보이기
  tooltip.style.display = 'block';
  /*parentElement.addEventListener('mouseenter', () => {
    tooltip.style.display = 'block';
});*/

// 요소에서 마우스 이탈시 툴팁 숨기기
parentElement.addEventListener('mouseleave', () => {
  tooltip.style.display = 'none';
});

// 요소에 마우스 움직일 때마다 툴팁 위치 업데이트
parentElement.addEventListener('mouseup', (event) => {
  //tooltip.style.left = event.clientX + 'px';
  //tooltip.style.top = event.clientY + 'px';
  tooltip.style.left = event.pageX + 'px';
  tooltip.style.top = event.pageY + 'px';
});

// 툴팁을 요소에 추가
parentElement.appendChild(tooltip);


});


tooltip.style.display = 'none'; // 처음에는 보이지 않도록 함
tooltip.style.position = 'absolute';
tooltip.style.backgroundColor = '#333';
tooltip.style.color = '#fff';
tooltip.style.padding = '5px';





document.onmouseup = function (e) {
  //추후 구현할 모달( or 논-모달??) 위치를 위해 좌표 가져오기
  const mouseX = e.clientX;
  const mouseY = e.clientY; // 나중에 기회 되면 변수로 바꾸기
  /**
  const drag = selectText();
  const parentElement = drag.anchorNode.parentElement;
  // 부모 요소의 ID 가져오기
  const parentId = parentElement.id;
  
  const tooltipElement = document.querySelector(parentId);

  console.log(mouseX, mouseY, selectText().toString())
  
  $dragged.textContent = drag;
  (async () => {
    const response = await chrome.runtime.sendMessage({greeting: "hello", text: drag});
    console.log(response.farewell); */
    /**백그라운드 스크립트로 갔다 오는 동작 확인
     * (백엔드에서 단어, 문장 구분을 하지 않는 경우)
     * future work:
     *  content script에서 판별한 뒤
     *  속성을 달리 해서 백그라운드로 전달해주면 될 듯!
     * 
     
  }) ();
  open;
  const $heading = document.querySelector("h1");
  ($heading).insertAdjacentElement("afterend", $dragged);*/
}