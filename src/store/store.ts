// dependencies
import { create } from "zustand"

// utils
import fetchInitialState from "~utils/fetchInitialState"
import fetchNewMessage from "~utils/fetchNewMessage"

import createSelectors from "./createSelectors"

type store = {
  message: string
  number: number
  updateMessage: () => void
}

const initialState: Omit<store, "updateMessage"> = fetchInitialState()

const baseStore = create<store>(set => {
  return {
    ...initialState,
    updateMessage: async () => {
      const updatedValue = await fetchNewMessage()
      set(() => ({
        message: updatedValue
      }))
    }
  }
})

const useStore = createSelectors(baseStore)

export default useStore
