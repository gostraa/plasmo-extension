export {};

let counter: number = 0;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.name === "increment") {
    counter++;
    sendResponse({ counter });
  } else if (request.name === "getCounterValue") {
    sendResponse({ counter: counter });
  }

  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      chrome.tabs.sendMessage(tab.id, {
        name: "counterUpdated",
        counter: counter,
      });
    });
  });
  //   chrome.runtime.sendMessage({ name: "counterUpdated", counter: counter });
});
