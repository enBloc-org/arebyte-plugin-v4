import Browser from "webextension-polyfill"

Browser.runtime.onMessage.addListener(
  (message: { action: string }, sender, sendResponse) => {
    if (message.action === "getScreenDimensions") {
      sendResponse({ width: window.screen.width, height: window.screen.height })
    }
    return true
  }
)

export {}
