import browser from "webextension-polyfill"

import setEventAlarm from "~utils/setEventAlarm"

export {}

if (process.env.NODE_ENV === "development") {
  console.log("This is a development build")
}

if (process.env.NODE_ENV === "production") {
  console.log("This is a production build")
}

browser.runtime.onInstalled.addListener(async () => {
  console.log("I N S T A L L E D")
  setEventAlarm(12, 0)
})
