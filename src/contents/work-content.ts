import type { PlasmoCSConfig } from "plasmo"

import { getWorkType } from "~helpers/getWorkType"
import { waitForElement } from "~helpers/waitForElement"

export const config: PlasmoCSConfig = {
  matches: ["https://www.work.ua/*"]
}
export const handleWorkUA = async () => {
  const positionElement = (await waitForElement(".card h1")) as HTMLElement

  const liNameElement = Array.from(
    document.querySelectorAll(".card .wordwrap ul li")
  ).find((li) => li.querySelector("span[title='Дані про компанію']"))

  const liWorkTypeElement = Array.from(
    document.querySelectorAll(".card .wordwrap ul li")
  ).find((li) => li.querySelector("span[title='Адреса роботи']"))

  const position = positionElement?.textContent?.trim() || "Не знайдено"
  const link = window.location.href
  const companyName =
    liNameElement?.querySelector("a span")?.textContent?.trim() || "Не знайдено"
  const relation = ""
  const location = liWorkTypeElement?.textContent?.trim() || "Не знайдено"
  const workType = getWorkType(liWorkTypeElement?.textContent?.trim())
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
