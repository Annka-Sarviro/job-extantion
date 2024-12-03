import type { PlasmoCSConfig } from "plasmo"

import { waitForElement } from "~helpers/waitForElement"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"]
}

const blockedDomains = [
  "djinni.co",
  "work.ua",
  "robota.ua",
  "jobs.dou.ua",
  "nofluffjobs.com",
  "indeed.com"
]

const isBlockedDomain = (): boolean => {
  const currentUrl = window.location.href
  return blockedDomains.some((domain) => currentUrl.includes(domain))
}

const handle = async () => {
  if (isBlockedDomain()) return

  try {
    const cardElement = (await waitForElement("h1")) as HTMLElement

    const position = cardElement?.textContent?.trim() || "Не знайдено"
    const link = `${window.location.origin}${window.location.pathname}`
    const companyName = "Не знайдено"
    const relation = "Не знайдено"
    const location = "Не знайдено"
    const workType = null
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
  } catch (error) {
    console.error("Error handling job details:", error)
  }
}

handle()

chrome.runtime.onMessage.addListener(async (message) => {
  if (message.type === "GET_JOB_DETAILS") {
    if (!isBlockedDomain()) {
      await handle()
    }
  }
  return true
})
