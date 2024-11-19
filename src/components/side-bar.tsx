import { useEffect, useState } from "react"

import "~styles"

const HOME_PAGE = process.env.PLASMO_PUBLIC_HOME_PAGE

export function SideBar() {
  const [link, setLink] = useState("")
  const [jobTitle, setJobTitle] = useState("")
  const [status, setStatus] = useState<string>("")
  const [response, setResponse] = useState("")

  useEffect(() => {
    const handleMessage = (message: any) => {
      if (message.type === "JOB_DETAILS") {
        setJobTitle(message.payload.jobTitle || "")
        setLink(message.payload.url || "")
      }
    }

    const handleTabUpdate = (tabId, changeInfo, tab) => {
      if (changeInfo.status === "complete" && tab.active) {
        chrome.runtime.sendMessage({ type: "FETCH_JOB_DETAILS" })
      }
    }

    chrome.runtime.onMessage.addListener(handleMessage)
    chrome.tabs.onUpdated.addListener(handleTabUpdate)

    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage)
      chrome.tabs.onUpdated.removeListener(handleTabUpdate) // Pass the callback to remove
    }
  })

  const handleSubmit = async () => {
    try {
      // const result = await axios.post(
      //   "https://your-server-endpoint.com/api/jobs",
      //   {
      //     jobTitle,
      //     url
      //   }
      // )

      setResponse("Дані успішно відправлено!")
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
      <input
        onChange={(e) => setLink(e.target.value)}
        value={link}
        className="border"
        placeholder="link"
        id="link"
      />
      <input
        onChange={(e) => setJobTitle(e.target.value)}
        value={jobTitle}
        className="border"
        placeholder="position"
        id="position"
      />
      <button onClick={handleSubmit} style={{ width: "100%", padding: "8px" }}>
        Відправити
      </button>
      {response && <p>{response}</p>}
    </div>
  )
}
