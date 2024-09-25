import browser from "webextension-polyfill"

import calculateCountDown from "~utils/calculateCountDown"

export {}

if (process.env.NODE_ENV === "development") {
  console.log("This is a development build")
}

if (process.env.NODE_ENV === "production") {
  console.log("This is a production build")
}

browser.alarms.create("test-alarm", {
  periodInMinutes: 1440,
  when: Date.now() + calculateCountDown(17, 9)
})

browser.alarms.onAlarm.addListener(alarm => {
  if (alarm.name === "test-alarm") {
    browser.windows.create({
      url: "popup.html",
      type: "popup",
      top: Math.floor(Math.random() * 1000),
      left: Math.floor(Math.random() * 1000)
    })
  }
})
