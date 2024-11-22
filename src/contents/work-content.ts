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

  const position = cardElement.textContent?.trim() || "Не знайдено"
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

handleWorkUA()

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "JOB_DETAILS") {
    if (window.location.href.includes("work.ua")) {
      handleWorkUA()
    }
  }
})
