import type { PlasmoCSConfig } from "plasmo"

import { waitForElement } from "~helpers/waitForElement"

export const config: PlasmoCSConfig = {
  matches: ["https://www.work.ua/*"]
}
export const handleWorkUA = async () => {
  const cardElement = (await waitForElement(".card h1")) as HTMLElement

  if (!cardElement) {
    console.warn("Елемент .card не знайдено.")
    return
  }

  const jobTitle = cardElement.textContent?.trim() || "Не знайдено"
  const url = window.location.href

  chrome.runtime.sendMessage({
    type: "JOB_DETAILS",
    payload: { jobTitle, url }
  })
}

handleWorkUA()

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "FETCH_JOB_DETAILS") {
    if (window.location.href.includes("robota.ua")) {
      handleWorkUA()
    }
  }
})

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.active) {
    chrome.runtime.sendMessage({ type: "FETCH_JOB_DETAILS" })
  }
})
