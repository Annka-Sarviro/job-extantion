import { useEffect, useState } from "react"

import "~styles"

const HOME_PAGE = process.env.PLASMO_PUBLIC_HOME_PAGE

export function SideBar() {
  const [link, setLink] = useState("")
  const [jobTitle, setJobTitle] = useState("")
  const [response, setResponse] = useState("")
  const [currentTab, setCurrentTab] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const getCurrentTab = async () => {
    let queryOptions = { active: true, lastFocusedWindow: true }
    let [tab] = await chrome.tabs.query(queryOptions)
    return tab
  }

  useEffect(() => {
    setIsLoading(true)
    const handleMessage = (message) => {
      if (message.type === "JOB_DETAILS") {
        setJobTitle(message.payload.jobTitle || "")
        setLink(message.payload.url || "")
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
    setIsLoading(false)
    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage)
      chrome.tabs.onActivated.removeListener(handleTabChange)
      chrome.tabs.onUpdated.removeListener(handleTabChange)
    }
  }, [currentTab])

  const handleSubmit = async () => {
    try {
      setIsLoading(true)
      // const result = await axios.post(
      //   "https://your-server-endpoint.com/api/jobs",
      //   {
      //     jobTitle,
      //     url
      //   }
      // )

      setTimeout(() => {
        setResponse("Дані успішно відправлено!")
        setIsLoading(false)
      }, 500)
    } catch (error) {
      setResponse("Помилка при відправці даних.")
    }
  }

  return (
    <div className="p-2 flex flex-col gap-y-4">
      <h2>
        Welcome to your{" "}
        <a href={HOME_PAGE} target="_blank">
          Job Tracker{" "}
        </a>{" "}
        extension!
      </h2>
      <div className="flex flex-col gap-y-1">
        <label htmlFor="link">Link</label>
        <input
          onChange={(e) => setLink(e.target.value)}
          value={link}
          className="border"
          placeholder="link"
          id="link"
        />
      </div>
      <div className="flex flex-col gap-y-1">
        <label htmlFor="position">Position</label>
        <input
          onChange={(e) => setJobTitle(e.target.value)}
          value={jobTitle}
          className="border"
          placeholder="position"
          id="position"
        />
      </div>
      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className="w-full p-2 bg-blue-950 disabled:bg-gray-500 text-white">
        Відправити
      </button>
      {response && <p>{response}</p>}
    </div>
  )
}
