import { create } from "zustand"

import updateMessage from "~utils/updateMessage"

import createSelectors from "./createSelectors"

type baseStore = {
  message: string
  number: number
  updateMessage: () => void
}

const store = create<baseStore>(set => {
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

const useStore = createSelectors(store)

export default useStore
