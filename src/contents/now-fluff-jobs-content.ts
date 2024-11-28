import type { PlasmoCSConfig } from "plasmo"
import type { z } from "zod"

import type { AddDataSchema } from "~components/submitForm"
import { waitForElement } from "~helpers/waitForElement"

import { getWorkType } from "../helpers/getWorkType"

export const config: PlasmoCSConfig = {
  matches: ["https://nofluffjobs.com/*"]
}

type JobDetailsPayload = z.infer<typeof AddDataSchema>

interface JobDetailsMessage {
  type: "JOB_DETAILS"
  payload: JobDetailsPayload
}

export const handleFluff = async () => {
  const companyElement = (await waitForElement(
    "common-posting-content-wrapper"
  )) as HTMLElement

  const vacancyTitleElement = companyElement.querySelector(
    "[data-cy='JobOffer_CompanyProfile']"
  )
  const jobPositionElement = companyElement.querySelector("h1")

  const locationElement = companyElement.querySelector(
    "common-posting-locations span"
  )

  const workTypeText = companyElement
    .querySelector("li[common-posting-locations-provinces]")
    ?.textContent?.trim()

  const workType = getWorkType(workTypeText)

  const position = jobPositionElement?.textContent?.trim() || "Не знайдено"
  const link = `${window.location.origin}${window.location.pathname}`
  const companyName = vacancyTitleElement?.textContent?.trim() || "Не знайдено"
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

handleFluff()

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "JOB_DETAILS") {
    if (window.location.href.includes("nofluffjobs.com")) {
      handleFluff()
    }
  }
})
