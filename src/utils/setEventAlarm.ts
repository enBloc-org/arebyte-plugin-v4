import browser from "webextension-polyfill"

import calculateCountDown from "~utils/calculateCountDown"

/**
 *
 * @param eventHour
 * @param eventMinute
 * @description sets a unique alarm for our daily event. This function should be called every time the event_time value is updated to align the extensions behaviour with the state of our data.
 */
export default function setEventAlarm(
  eventHour: number,
  eventMinute: number
) {
  console.log("SETTING THE A L A R M")

  browser.alarms.create("test-alarm", {
    periodInMinutes: 1440,
    when: calculateCountDown(eventHour, eventMinute)
  })

  browser.alarms.onAlarm.addListener(alarm => {
    if (alarm.name !== "test-alarm") return

    browser.windows.create({
      url: "https://media.4-paws.org/f/b/9/e/fb9eaf496f739315766331e91bddde8936375550/VP0113037-1927x1333.jpg",
      type: "popup",
      top: Math.floor(Math.random() * 1000),
      left: Math.floor(Math.random() * 1000)
    })
  })
}
