// dependencies
import { create } from "zustand"

// utils
import updateMessage from "~utils/updateMessage"

import createSelectors from "./createSelectors"

type store = {
  message: string
  number: number
  updateMessage: () => void
}

const baseStore = create<store>(set => {
  return {
    message: "initial message",
    number: 1,
    updateMessage: async () => {
      const updatedValue = await updateMessage()
      set(() => ({
        message: updatedValue
      }))
    }
  }
})

const useStore = createSelectors(baseStore)

export default useStore
