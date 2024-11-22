import { useEffect, useState } from "react"

import "~styles"

import { SubmitForm } from "./submitForm"

const HOME_PAGE = process.env.PLASMO_PUBLIC_HOME_PAGE

export function SideBar() {
  const [companyName, setCompanyName] = useState("")
  const [link, setLink] = useState("")
  const [position, setPosition] = useState("")
  const [relation, setRelation] = useState("")
  const [location, setLocation] = useState("")
  const [workType, setWorkType] = useState("remote")
  const [status, setStatus] = useState("saved")
  const [notes, setNotes] = useState("")

  const [currentTab, setCurrentTab] = useState(null)

  const getCurrentTab = async () => {
    let queryOptions = { active: true, lastFocusedWindow: true }
    let [tab] = await chrome.tabs.query(queryOptions)
    return tab
  }

  useEffect(() => {
    const handleMessage = (message) => {
      if (message.type === "JOB_DETAILS") {
        setCompanyName(message.payload.companyName || "")
        setPosition(message.payload.position || "")
        setLink(message.payload.link || "")
        setRelation(message.payload.relation || "")
        setLocation(message.payload.location || "")
        setWorkType(message.payload.workType || "remote")
        setStatus(message.payload.status || "saved")
        setNotes(message.payload.notes || "")
      }
    }

    chrome.runtime.onMessage.addListener(handleMessage)

    const handleTabChange = async () => {
      const tab = await getCurrentTab()
      if (tab) {
        setCurrentTab(tab)
        chrome.tabs.sendMessage(tab.id, { type: "JOB_DETAILS" })
      }
    }

    chrome.tabs.onActivated.addListener(handleTabChange)
    chrome.tabs.onUpdated.addListener(handleTabChange)

    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage)
      chrome.tabs.onActivated.removeListener(handleTabChange)
      chrome.tabs.onUpdated.removeListener(handleTabChange)
    }
  }, [currentTab])

  return (
    <div className="p-2 flex flex-col gap-y-2">
      <h2 className="font-bold text-xl text-center inline-block w-60 mx-auto">
        Вітаємо у розширенні{" "}
        <a href={HOME_PAGE} target="_blank" className="text-accent">
          Job Tracker
        </a>
      </h2>
      <SubmitForm
        data={{
          companyName,
          position,
          link,
          relation,
          location,
          workType: workType as "remote" | "office" | "hybrid",
          status: status as "saved" | "new" | "hr" | "test" | "tech" | "reject",
          notes
        }}
      />
    </div>
  )
}
