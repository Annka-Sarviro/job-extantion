import type { PlasmoCSConfig } from "plasmo"

import { waitForElement } from "~helpers/waitForElement"

export const config: PlasmoCSConfig = {
  matches: ["https://robota.ua/*"]
}

export const handleRobota = async () => {
  const jobPostElement = (await waitForElement(
    "[data-id='vacancy-title']"
  )) as HTMLElement

  if (!jobPostElement) {
    console.warn("Елемент .job-post-page h1 не знайдено.")
    return
  }

  const position = jobPostElement.textContent?.trim() || "Не знайдено"
  const link = window.location.href
  const companyName = ""
  const relation = ""
  const location = ""
  const workType = "remote"
  const status = "saved"
  const notes = ""

  chrome.runtime.sendMessage({
    type: "JOB_DETAILS",
    payload: {
      position,
      link,
      companyName,
      relation,
      location,
      workType,
      status,
      notes
    }
  })
}

handleRobota()

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "JOB_DETAILS") {
    if (window.location.href.includes("robota.ua")) {
      handleRobota()
    }
  }
})
