import { useEffect, useState } from "react"

import "~styles"

import { logout as logoutFunction } from "~helpers/auth"

import { Button } from "./button"
import { SubmitForm } from "./submitForm"

const HOME_PAGE = process.env.PLASMO_PUBLIC_HOME_PAGE

export function SideBar() {
  const [companyName, setCompanyName] = useState("")
  const [link, setLink] = useState("")
  const [position, setPosition] = useState("")
  const [relation, setRelation] = useState("")
  const [location, setLocation] = useState("")
  const [workType, setWorkType] = useState<
    "remote" | "office" | "hybrid" | null
  >(null)
  const [status, setStatus] = useState<
    "saved" | "new" | "hr" | "test" | "tech" | "reject"
  >("saved")
  const [notes, setNotes] = useState("")
  const [isToken, setIsToken] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("access_token")
    setIsToken(!!token)
  }, [])

  const getCurrentTab = async () => {
    const queryOptions = { active: true, lastFocusedWindow: true }
    const [tab] = await chrome.tabs.query(queryOptions)
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
        setWorkType(message.payload.workType)
        setStatus(message.payload.status || "saved")
        setNotes(message.payload.notes || "")
      }
    }

    const handleTabChange = async () => {
      const tab = await getCurrentTab()
      if (tab?.id) {
        chrome.tabs.sendMessage(
          tab.id,
          { type: "GET_JOB_DETAILS" },
          (response) => {
            if (chrome.runtime.lastError) {
              console.log("Error:", chrome.runtime.lastError)
              return
            }
            if (response && response?.type === "JOB_DETAILS") {
              setCompanyName(response.payload.companyName || "")
              setPosition(response.payload.position || "")
              setLink(response.payload.link || "")
              setRelation(response.payload.relation || "")
              setLocation(response.payload.location || "")
              setWorkType(response.payload.workType)
              setStatus(response.payload.status || "saved")
              setNotes(response.payload.notes || "")
            }
          }
        )
      }
    }

    chrome.runtime.onMessage.addListener(handleMessage)
    chrome.tabs.onActivated.addListener(handleTabChange)
    chrome.tabs.onUpdated.addListener(handleTabChange)

    handleTabChange()

    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage)
      chrome.tabs.onActivated.removeListener(handleTabChange)
      chrome.tabs.onUpdated.removeListener(handleTabChange)
    }
  }, [window.location])

  const logout = async () => {
    await logoutFunction()
  }

  return (
    <div className="p-2 flex flex-col gap-y-2">
      {isToken && (
        <Button
          onClick={logout}
          variant="ghost"
          size="small"
          className="ml-auto min-w-[auto] !px-4">
          Вийти
        </Button>
      )}
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
          workType,
          status,
          notes
        }}
      />
    </div>
  )
}
