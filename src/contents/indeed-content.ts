import type { PlasmoCSConfig } from "plasmo"
import type { z } from "zod"

import type { AddDataSchema } from "~components/submitForm"
import { waitForElement } from "~helpers/waitForElement"

import { getWorkType } from "../helpers/getWorkType"

export const config: PlasmoCSConfig = {
  matches: ["https://ua.indeed.com/*"]
}

type JobDetailsPayload = z.infer<typeof AddDataSchema>

// Інтерфейс для повідомлення
interface JobDetailsMessage {
  type: "JOB_DETAILS"
  payload: JobDetailsPayload
}

export const handleIndeed = async () => {
  const companyElement = (await waitForElement(
    "#jobsearch-ViewjobPaneWrapper"
  )) as HTMLElement

  // const vacancyElement = (await waitForElement(".l-vacancy")) as HTMLElement
  const jobPositionElement =
    companyElement.querySelector("h2 > span")?.firstChild

  const locationElement = companyElement.querySelector(
    "[data-testid='inlineHeader-companyLocation']"
  )

  const companyNameEl = companyElement.querySelector(
    "[data-testid='inlineHeader-companyName']"
  )

  const workTypeEl = locationElement?.textContent?.trim()

  const workTypeText = workTypeEl?.includes("Дистанційно")
    ? "Дистанційно"
    : "Офіс"
  const workType = getWorkType(workTypeText)

  const position = jobPositionElement?.textContent?.trim() || "Не знайдено"
  const link = window.location.href
  const companyName =
    companyNameEl?.querySelector("a").textContent?.trim() || "Не знайдено"
  const relation = ""
  const location =
    locationElement?.textContent?.trim() !== "Дистанційно"
      ? locationElement?.textContent?.trim()
      : "Не знайдено"
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

handleIndeed()

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "JOB_DETAILS") {
    if (window.location.href.includes("indeed.com")) {
      handleIndeed()
    }
  }
})
