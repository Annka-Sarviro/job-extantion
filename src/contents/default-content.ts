import type { PlasmoCSConfig } from "plasmo"

import { waitForElement } from "~helpers/waitForElement"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"]
}

const blockedDomains = ["djinni.co", "work.ua", "robota.ua"]

export const handle = async () => {
  const cardElement = (await waitForElement(" h1")) as HTMLElement

  const position = cardElement?.textContent?.trim() || "Не знайдено"
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

handle()

chrome.runtime.onMessage.addListener((message) => {
  const currentUrl = window.location.href
  const containsBlockedDomain = blockedDomains.some((domain) =>
    currentUrl.includes(domain)
  )

  if (!containsBlockedDomain) {
    handle()
  }
})
