import type { PlasmoCSConfig } from "plasmo"

import { getWorkType } from "~helpers/getWorkType"
import { waitForElement } from "~helpers/waitForElement"

export const config: PlasmoCSConfig = {
  matches: ["https://robota.ua/*"]
}

export const handleRobota = async () => {
  const positionElement = (await waitForElement(
    "[data-id='vacancy-title']"
  )) as HTMLElement

  if (!positionElement) {
    console.warn("Елемент .job-post-page h1 не знайдено.")
    return
  }

  const companyEl = Array.from(document.querySelectorAll("lib-content")).find(
    (a) => a.querySelector('a[href*="/company"]')
  )

  const descriptionCompanyEl = companyEl.querySelector("lib-badges-list")

  const workTypeText = Array.from(descriptionCompanyEl.querySelectorAll("div"))
    .find(
      (div) =>
        div?.textContent?.includes("В офісі/на місці") ||
        div?.textContent?.includes("Віддалена робота") ||
        div?.textContent?.includes("Гібридна")
    )
    .querySelector("div")
    ?.textContent?.trim()

  const cityElement = (await waitForElement(
    "[data-id='vacancy-city']"
  )) as HTMLElement

  const position = positionElement.textContent?.trim() || "Не знайдено"
  const link = window.location.href
  const companyName =
    companyEl.querySelector('a[href*="/company"] span')?.textContent.trim() ||
    "Не знайдено"
  const relation = ""
  const location = cityElement.textContent?.trim() || "Не знайдено"
  const workType = getWorkType(workTypeText)
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
