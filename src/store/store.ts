import { create } from "zustand"

import type { CurrentProjectResponse } from "~types/projectTypes"
import type { User, UserSession } from "~types/userTypes"

import createSelectors from "./createSelectors"

export type PlayList = typeof baseStore<
  State["user"]["audience_member"]["playlist"]
>

interface State {
  user: User
  isLoggedIn: boolean
  currentPage:
    | "home"
    | "profile"
    | "explore"
    | "login"
    | "current-project"
    | "explore-project"
    | "favourites"
  previousPage: State["currentPage"]
  exploreProjectId?: number
}

interface Actions {
  navigateTo: (nextPage: State["currentPage"]) => void
  updateUser: (newUser: UserSession) => void
  resetStore: () => void
  updateExploreProjectId: (id: number) => void
}

const initialState: State = {
  user: {
    id: undefined,
    username: undefined,
    email: undefined,
    audience_member: {
      is_quiet: false,
      is_paused: false,
      project_id: undefined,
      current_index: 0,
      event_time: "12:00:00.000",
      playlist: []
    }
  },
  isLoggedIn: false,
  currentPage: "home",
  previousPage: "home"
}

const baseStore = create<State & Actions>(set => {
  return {
    ...initialState,
    navigateTo: nextPage =>
      set(state => ({
        previousPage: state.currentPage,
        currentPage: nextPage
      })),

    updateUser: newUser => {
      set(() => ({ user: newUser.user, isLoggedIn: true }))
    },
    resetStore: () =>
      set(() => ({
        user: initialState.user,
        isLoggedIn: initialState.isLoggedIn,
        currentPage: initialState.currentPage,
        previousPage: initialState.previousPage
      }))
  }
})

const useStore = createSelectors(baseStore)

export default useStore
