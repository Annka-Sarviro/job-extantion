import type { PlasmoCSConfig } from "plasmo"
import type { z } from "zod"

import type { AddDataSchema } from "~components/submitForm"
import { waitForElement } from "~helpers/waitForElement"

import { getWorkType } from "../helpers/getWorkType"

export const config: PlasmoCSConfig = {
  matches: ["https://djinni.co/jobs/*"]
}

type JobDetailsPayload = z.infer<typeof AddDataSchema>

// Інтерфейс для повідомлення
interface JobDetailsMessage {
  type: "JOB_DETAILS"
  payload: JobDetailsPayload
}

export const handleDjinni = async () => {
  const jobPositionElement = (await waitForElement(
    ".job-post-page h1"
  )) as HTMLElement

  const jobCompanyElement = (await waitForElement(
    "header a.text-reset"
  )) as HTMLElement

  const locationElement = (await waitForElement(
    "aside .card .location-text"
  )) as HTMLElement

  const liElement = Array.from(
    document.querySelectorAll("aside .card ul li")
  ).find(
    (li) =>
      li
        .querySelector("strong")
        ?.textContent?.toLowerCase()
        ?.includes("офіс") ||
      li
        .querySelector("strong")
        ?.textContent?.toLowerCase()
        ?.includes("віддалено")
  )

  const workTypeText = liElement.querySelector("strong")?.textContent?.trim()
  const workType = getWorkType(workTypeText)
  const position = jobPositionElement?.textContent?.trim() || "Не знайдено"
  const link = window.location.href
  const companyName = jobCompanyElement?.textContent?.trim() || "Не знайдено"
  const relation = ""
  const location = locationElement?.textContent?.trim() || "Не знайдено"
  const status = "saved"
  const notes = ""

  chrome.runtime.sendMessage<JobDetailsMessage>({
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

handleDjinni()

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "JOB_DETAILS") {
    if (window.location.href.includes("djinni.co")) {
      handleDjinni()
    }
  }
})
