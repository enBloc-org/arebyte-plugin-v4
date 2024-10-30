import Browser from "webextension-polyfill"

import type { PlasmoMessaging } from "@plasmohq/messaging"

import eventAlarmListener from "~utils/eventAlarmListener"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const alarm = await Browser.alarms.get("sequence-alarm")
  console.log(alarm)
  await eventAlarmListener(alarm)

  res.send("ok")
}

export default handler
