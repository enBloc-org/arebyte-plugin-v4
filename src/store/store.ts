// dependencies
import { create } from "zustand"

import createSelectors from "./createSelectors"

export type PlayList = typeof baseStore<State["user"]["playList"]>
export type User = typeof baseStore<State["user"]>

type State = {
  user: {
    username?: string
    firstName?: string
    lastName?: string
    email?: string
    isQuietMode: boolean
    isPaused: boolean
    eventTime: string
    playList: number[]
  }
  currentProject?: number
}

type Actions = {
  updateCurrentProject: (id: State["currentProject"]) => void
}

const baseStore = create<State & Actions>(set => {
  return {
    user: {
      username: undefined,
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      isQuietMode: false,
      isPaused: false,
      eventTime: new Date(new Date().setHours(12, 0, 0, 0))
        .getTime()
        .toString(),
      playList: []
    },
    currentProject: undefined,
    updateCurrentProject: id => set(() => ({ currentProject: id }))
  }
})

const useStore = createSelectors(baseStore)

export default useStore
