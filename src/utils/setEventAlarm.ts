import browser from "webextension-polyfill"

import calculateCountDown from "~utils/calculateCountDown"

import eventAlarmListener from "./eventAlarmListener"

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
  browser.alarms.clear("sequence-alarm")
  browser.alarms.onAlarm.removeListener(eventAlarmListener)

  browser.alarms.create("sequence-alarm", {
    periodInMinutes: 1440,
    when: calculateCountDown(eventHour, eventMinute)
  })
  browser.alarms.onAlarm.addListener(eventAlarmListener)
}
