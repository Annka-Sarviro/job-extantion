console.log("start background")

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "JOB_DETAILS") {
    chrome.runtime.sendMessage(message)
  }
})

chrome.action.onClicked.addListener(() => {
  chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error) => console.error("Failed to open side panel:", error))

  chrome.runtime.sendMessage({ type: "JOB_DETAILS" })
})

chrome.tabs.onActivated.addListener(() => {
  chrome.runtime.sendMessage({ type: "JOB_DETAILS" })
})

chrome.tabs.onUpdated.addListener(() => {
  chrome.runtime.sendMessage({ type: "JOB_DETAILS" })
})
console.log("end background")
