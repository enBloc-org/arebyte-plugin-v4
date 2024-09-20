import { create } from "zustand"

import { sendToBackground } from "@plasmohq/messaging"

const useStore = create(set => {
  return {
    message: "initial message",
    updateMessage: async () => {
      const update = await sendToBackground({ name: "set_context" })
      set(update)
    }
  }
})

export default useStore
