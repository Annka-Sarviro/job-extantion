import { SideBar } from "~components/side-bar"

function IndexSidePanel() {
  chrome.storage.local.get("firstTime", ({ firstTime }) => {
    if (firstTime) {
      chrome.storage.local.set({ firstTime: false })
      chrome.runtime.openOptionsPage()
    }
  })
  return <SideBar />
}

export default IndexSidePanel
