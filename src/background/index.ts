import { refreshToken as refreshTokenFunction } from "~helpers/auth"

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "JOB_DETAILS") {
    chrome.runtime.sendMessage(message)
  }
})

chrome.runtime.onInstalled.addListener(() => {
  checkAndOpenOptions()
})

chrome.runtime.onStartup.addListener(() => {
  checkAndOpenOptions()
})

async function checkAndOpenOptions() {
  try {
    const { access_token: accessToken, refresh_token: refreshToken } =
      await chrome.storage.local.get(["access_token", "refresh_token"])

    if (!accessToken || !refreshToken) {
      chrome.runtime.openOptionsPage()
    } else {
      try {
        await refreshTokenFunction()
      } catch (error) {
        console.error("Failed to refresh token:", error)
        chrome.runtime.openOptionsPage()
      }
    }
  } catch (error) {
    console.error("Error accessing storage:", error)
    chrome.runtime.openOptionsPage()
  }
}
