chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "JOB_DETAILS") {
    chrome.runtime.sendMessage(message)
  }
})

// chrome.action.onClicked.addListener(() => {
//   chrome.sidePanel
//     .setPanelBehavior({ openPanelOnActionClick: true })
//     .catch((error) => console.error("Failed to open side panel:", error))
// })

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.active) {
    chrome.runtime.sendMessage({ type: "FETCH_JOB_DETAILS" })
  }
})
