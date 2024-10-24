import type { PlasmoMessaging } from "@plasmohq/messaging"

import setEventAlarm from "~utils/setEventAlarm"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const { eventHour, eventMinute } = req.body
  const {data, error} = await setEventAlarm(eventHour, eventMinute)
  if (error)
    res.send({ data: null, error: error })
  res.send({ data: data, error: null })
}

export default handler
