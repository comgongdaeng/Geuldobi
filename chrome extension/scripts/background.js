// background script에서
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "change_input_value") {
    chrome.tabs.query({url: "*://mail.google.com/*"}, (tabs) => {
      tabs.forEach((tab) => {
        chrome.tabs.executeScript(tab.id, {code: `document.querySelector('[aria-label="To"]').value = "${message.value}";`});
      });
    });
  }
});

/*
chrome.action.onClicked.addListener(async (tab) => {
  const [tabId] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tabId },
    func: () => {
      const divs = document.getElementsByTagName('div');
      for (let i = 0; i < divs.length; i++) {
        divs[i].textContent = 'newContent';
      }
    }
  });
});




chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    /*console.log(sender.tab ?
      "from a content script:" + sender.tab.url :
      "from the extension");*//*
      var replaced;
    if (request.greeting === "hello") {
      replaced = request.text;
      
      chrome.scripting.executeScript({
        target: { tabId: sender.tab.id },
        func: (replaced) => {
          const divs = document.getElementsByTagName('div');
          for (let i = 0; i < divs.length; i++) {
            if(divs[i].innerHTML.includes(replaced))
              divs[i].innerHTML = divs[i].innerHTML.replace(replaced, "이 부분 텍스트 바꿔주려고");
              //replaced = divs[i].innerHTML;
          }
          

        }
      })
      sendResponse({ farewell: "백그라운드 갔다옴~", "check":replaced});

    }


  }
);

/*
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete'&& tab.url.includes('mail.google.com')) {
    chrome.scripting.executeScript(tabId, {
      code: `
        const observer = new MutationObserver(mutations => {
          mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
              if (node.nodeName === 'DIV' && node.getAttribute('aria-label') === 'Message Body') {
                node.addEventListener('input', e => {
                  const value = e.target.innerHTML;
                  const replaced = value.replace(/교수/g, '교수님');
                  e.target.innerHTML = replaced;
                });
              }
            });
          });
        });
        const target = document.body;
        const config = { childList: true, subtree: true };
        observer.observe(target, config);
      `,
    });
  }
});

*/

