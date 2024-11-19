import type { PlasmoCSConfig } from "plasmo"

import { waitForElement } from "~helpers/waitForElement"

export const config: PlasmoCSConfig = {
  matches: ["https://djinni.co/*"]
}
export const handleDjinni = async () => {
  const jobPostElement = (await waitForElement(
    ".job-post-page h1"
  )) as HTMLElement

  if (!jobPostElement) {
    console.warn("Елемент .job-post-page h1 не знайдено.")
    return
  }

  const jobTitle = jobPostElement.textContent?.trim() || "Не знайдено"
  const url = window.location.href

  chrome.runtime.sendMessage({
    type: "JOB_DETAILS",
    payload: { jobTitle, url }
  })
}

handleDjinni()

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "FETCH_JOB_DETAILS") {
    if (window.location.href.includes("djinni.co")) {
      handleDjinni()
    }
  }
})

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.active) {
    chrome.runtime.sendMessage({ type: "FETCH_JOB_DETAILS" })
  }
})
