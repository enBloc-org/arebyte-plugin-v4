import type { PlasmoMessaging } from "@plasmohq/messaging"

import backgroundPopupCreate from "~utils/backgroundPopCreate"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  backgroundPopupCreate(req.body.images)
  res.send("success!")
}

export default handler
