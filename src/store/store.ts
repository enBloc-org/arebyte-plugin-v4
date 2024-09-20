import { create } from "zustand"

const useStore = create(set => ({
  message: "initial message",
  updateMessage: () =>
    set(state =>
      state.message === "initial message"
        ? { message: "updated message" }
        : { message: "initial message" }
    )
}))

export default useStore
