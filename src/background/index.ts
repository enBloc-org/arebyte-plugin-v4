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
  when: calculateCountDown(12, 0)
})

browser.alarms.onAlarm.addListener(alarm => {
  if (alarm.name === "test-alarm") {
    browser.windows.create({
      url: "https://media.4-paws.org/f/b/9/e/fb9eaf496f739315766331e91bddde8936375550/VP0113037-1927x1333.jpg",
      type: "popup",
      top: Math.floor(Math.random() * 1000),
      left: Math.floor(Math.random() * 1000)
    })
  }
})
