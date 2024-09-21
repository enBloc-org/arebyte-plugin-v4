import { create } from "zustand"

import { sendToBackground } from "@plasmohq/messaging"

import createSelectors from "./createSelectors"

interface storeBase {
  message: string
  updateMessage: () => void
}

const store = create<storeBase>(set => {
  return {
    message: "initial message",
    updateMessage: async () => {
      const update = await sendToBackground({ name: "set_context" })
      set(update)
    }
  }
})

const useStore = createSelectors(store)

export default useStore
