import getCounterValue from "./messages/getCounterValue"
import increment from "./messages/increment"

let counter = 0

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.name === "increment") {
    counter = increment(counter)
    sendResponse({ counter })
  } else if (request.name === "getCounterValue") {
    sendResponse({ counter: getCounterValue(counter) })
  }

  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      chrome.tabs.sendMessage(tab.id, {
        name: "counterUpdated",
        counter: counter
      })
    })
  })
  chrome.runtime.sendMessage({ name: "counterUpdated", counter: counter })
})
