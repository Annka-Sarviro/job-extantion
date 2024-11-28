import type { PlasmoCSConfig } from "plasmo"
import type { z } from "zod"

import type { AddDataSchema } from "~components/submitForm"
import { waitForElement } from "~helpers/waitForElement"

import { getWorkType } from "../helpers/getWorkType"

export const config: PlasmoCSConfig = {
  matches: ["https://jobs.dou.ua/*"]
}

type JobDetailsPayload = z.infer<typeof AddDataSchema>

// Інтерфейс для повідомлення
interface JobDetailsMessage {
  type: "JOB_DETAILS"
  payload: JobDetailsPayload
}

export const handleDou = async () => {
  const companyElement = (await waitForElement(
    ".b-compinfo .info .l-n a:not(.all-v)"
  )) as HTMLElement

  const vacancyElement = (await waitForElement(".l-vacancy")) as HTMLElement
  const jobPositionElement = vacancyElement.querySelector("h1")

  const locationElement = vacancyElement.querySelector(".place")

  const workTypeEl = locationElement?.textContent?.trim()

  const workTypeText = workTypeEl?.includes("віддалено") ? "Віддалено" : "Офіс"
  const workType = getWorkType(workTypeText)

  const position = jobPositionElement?.textContent?.trim() || "Не знайдено"
  const link = `${window.location.origin}${window.location.pathname}`
  const companyName = companyElement?.textContent?.trim() || "Не знайдено"
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

handleDou()

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "JOB_DETAILS") {
    if (window.location.href.includes("jobs.dou.ua")) {
      handleDou()
    }
  }
})
