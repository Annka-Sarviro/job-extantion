import type { PlasmoCSConfig } from "plasmo"
import type { z } from "zod"

import type { AddDataSchema } from "~components/submitForm"
import { waitForElement } from "~helpers/waitForElement"

export const config: PlasmoCSConfig = {
  matches: ["https://djinni.co/*"]
}

type JobDetailsPayload = z.infer<typeof AddDataSchema>

// Інтерфейс для повідомлення
interface JobDetailsMessage {
  type: "JOB_DETAILS"
  payload: JobDetailsPayload
}

export const handleDjinni = async () => {
  const jobPostElement = (await waitForElement(
    ".job-post-page h1"
  )) as HTMLElement

  if (!jobPostElement) {
    console.warn("Елемент .job-post-page h1 не знайдено.")
    return
  }

  const position = jobPostElement.textContent?.trim() || "Не знайдено"
  const link = window.location.href
  const companyName = ""
  const relation = ""
  const location = ""
  const workType = "remote"
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
