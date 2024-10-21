import Browser from "webextension-polyfill"

import type { PlasmoMessaging } from "@plasmohq/messaging"

const handler: PlasmoMessaging.MessageHandler = async () => {
  Browser.alarms.clear("sequence-alarm")
}

export default handler
