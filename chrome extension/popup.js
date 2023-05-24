var temp = true;
const $onsite = document.querySelector('#onsite');

// var switch1 = $("#gdbSwitch");
// switch1.click(function(){
//   $("#gdbOFF, #gdbON").toggle();
// });

// var switch2 = $("#CorSwitch");
// switch2.click(function(){
//   $("#CorOFF, #CorON").toggle();
// });

// var switch3 = $("#formalSwitch");
// switch3.click(function(){
//   $("#formalOFF, #formalON").toggle();
// });

// var switch4 = $("#wordrecSwitch");
// switch4.click(function(){
//   $("#wordrecOFF, #wordrecON").toggle();
// });
let gdbPower=false;

document.addEventListener('DOMContentLoaded', function() {

  const gdbPowerSwitch = document.getElementById('gdbSwitch');

  gdbPowerSwitch.addEventListener('click', function() {
    // checkbox의 상태를 저장합니다.
    chrome.storage.sync.set({ isChecked: gdbPowerSwitch.checked }, function() {
      console.log('gdbPowerSwitch state saved.');
    });
    chrome.runtime.sendMessage({ isChecked: gdbPowerSwitch.checked }, function(response) {
      console.log('Message sent to background.js');
    });
    // chrome.storage.sync.set({ gdbPower: true }, function() {
    //   console.log('gdbPower state saved.');
    // });
    
  });

  chrome.storage.sync.get('isChecked', function(data) {
    if (data.isChecked !== undefined) {
      // 저장된 상태가 있을 경우 checkbox의 상태를 설정합니다.
      gdbPowerSwitch.checked = data.isChecked;
    }
  });
});


// function restoreOptions() {
//   chrome.storage.sync.get({
//       //False is the default value when first opening the extension
//       'initialValue' : false
//   }, function (items) {
//       document.getElementById('gdbSwitch').checked = items.initialValue;
//   });
// }

// document.addEventListener('DOMContentLoaded', function () {
//   restoreOptions();
//   document.getElementById("gdbSwitch").addEventListener('click', runTimer);
//   console.log("DOM Loaded");
// });



// popup.js
// document.addEventListener("DOMContentLoaded", function() {
//   //var checkbox = document.getElementById("gdbSwitch");
//   var switch1 = $("#gdbSwitch");
  
//   // 저장된 상태를 불러와서 checkbox의 상태를 복원합니다.
//   chrome.storage.sync.get("extensionEnabled", function(data) {
//     switch1.checked = data.extensionEnabled;
//   });
  
//   switch1.click(function(){
//     $("#gdbOFF, #gdbON").toggle();

//     var isChecked = checkbox.checked;
//     chrome.storage.sync.set({ extensionEnabled: isChecked });

//     var message = {
//       action: isChecked ? "enableExtension" : "disableExtension"
//     };
    
//     chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//       chrome.tabs.sendMessage(tabs[0].id, message);
//     });

//   });



// });

