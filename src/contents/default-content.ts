import type { PlasmoCSConfig } from "plasmo"

import { waitForElement } from "~helpers/waitForElement"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"]
}

const blockedDomains = ["djinni.co", "work.ua", "example.com"]

export const handle = async () => {
  const cardElement = (await waitForElement(" h1")) as HTMLElement

  const jobTitle = cardElement?.textContent?.trim() || "Не знайдено"
  const url = window.location.href

  chrome.runtime.sendMessage({
    type: "JOB_DETAILS",
    payload: { jobTitle, url }
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
