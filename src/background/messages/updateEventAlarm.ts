import type { PlasmoMessaging } from "@plasmohq/messaging"

import setEventAlarm from "~utils/setEventAlarm"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const { eventHour, eventMinute } = req.body
  const newAlarm = setEventAlarm(eventHour, eventMinute)
  if (!newAlarm)
    res.send({ data: null, error: "Could not set new alarm" })
  res.send({ data: newAlarm, error: null })
}

export default handler
