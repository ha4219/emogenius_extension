// background.js
chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: contentScriptFunc,
    args: ["action"],
  });
});

async function contentScriptFunc(name) {
  convert = [
    "가난한, 불우한",
    "감사하는",
    "걱정스러운",
    "고립된",
    "외로운",
    "괴로워하는",
    "구역질 나는",
    "기쁨",
    "낙담한",
    "남의 시선을 의식하는",
    "노여워하는",
    "눈물이 나는",
    "느긋",
    "당혹스러운",
    "당황",
    "두려운",
    "마비된",
    "만족스러운",
    "방어적인",
    "배신당한",
    "버려진",
    "부끄러운",
    "분노",
    "불안",
    "비통한",
    "상처",
    "성가신",
    "스트레스 받는",
    "슬픔",
    "신뢰하는",
    "신이 난",
    "실망한",
    "악의적인",
    "안달하는",
    "안도",
    "억울한",
    "열등감",
    "염세적인",
    "우울한",
    "자신하는",
    "조심스러운",
    "좌절한",
    "죄책감의",
    "질투하는",
    "짜증내는",
    "초조한",
    "충격 받은",
    "취약한",
    "툴툴대는",
    "편안한",
    "한심한",
    "혐오스러운",
    "혼란스러운",
    "환멸을 느끼는",
    "회의적인",
    "후회되는",
    "흥분",
    "희생된",
  ];
  var text = "";
  if (window.getSelection) {
    text = window.getSelection().toString();
  } else if (document.selection && document.selection.type != "Control") {
    text = document.selection.createRange().text;
  }
  if (!text.length) {
    alert("입력된 text가 없습니다. drag 후 단축키를 입력해주세요");
    return;
  }
  var emotion = "감정";
  console.log("request text:", text);
  fetch("https://donglog.today/predict", {
    method: "POST",
    body: JSON.stringify({
      text: text,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .catch((e) => {
      alert(e);
    })
    .then((res) => {
      if (res.status == 500) {
        alert("허용되지 않는 사이트 입니다.");
        return;
      }
      return res.json();
    })
    .then((res) => {
      emotion = `${text} -> ${convert[res["result"]]}`;
      var dialog = document.createElement("dialog");
      dialog.id = "emogenius";
      dialog.style = `
        
      `;
      dialog.textContent = emotion;
      var button = document.createElement("button");
      button.textContent = "Close";
      dialog.appendChild(button);
      dialog.addEventListener("click", function (e) {
        if (e.target === dialog) {
          dialog.close();
        }
      });
      // document.addEventListener("click", (e) => {
      //   console.log(e.target.id);
      //   if (e.target.id !== "emogenius") {
      //     dialog.close();
      //   }
      //   return;
      // });
      document.body.appendChild(dialog);
      dialog.showModal();
    });
}

// This callback WILL NOT be called for "_execute_action"
chrome.commands.onCommand.addListener((command) => {
  console.log(`Command "${command}" called`);
});
