import type { PlasmoMessaging } from "@plasmohq/messaging"

import setEventAlarm from "~utils/setEventAlarm"

const handler: PlasmoMessaging.MessageHandler = async req => {
  const { eventHour, eventMinute } = req.body

  setEventAlarm(eventHour, eventMinute)
}

export default handler
