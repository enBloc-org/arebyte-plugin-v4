import Browser from "webextension-polyfill"

import type { PlasmoMessaging } from "@plasmohq/messaging"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  try {
    const windows = await Browser.windows.getAll({
      windowTypes: ["popup"]
    })

    for (const window of windows) {
      if (window.id) {
        await Browser.windows.remove(window.id)
      }
    }
  } catch (error) {
    console.error(`Error in closeAllPopups: ${error}`)
    res.send("error")
  }
}

export default handler
