import { create } from "zustand"

import type { ProjectResponse } from "~types/projectTypes"
import type { User } from "~types/userTypes"

import createSelectors from "./createSelectors"

export type PlayList = typeof baseStore<
  State["user"]["audience_member"]["playlist"]
>

interface State {
  user: User
  active_project?: ProjectResponse
  isLoggedIn: boolean
  currentPage: "home" | "profile" | "explore" | "login" | "favourites"
  previousPage: State["currentPage"]
}

interface Actions {
  updateCurrentProject: (project: ProjectResponse) => void
  navigateTo: (nextPage: State["currentPage"]) => void
  updateUserSession: (newLoggedStatus: boolean) => void
  updateUser: (newUser: User) => void
  resetStore: () => void
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
  active_project: undefined,
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
    updateCurrentProject: project =>
      set(() => ({ active_project: project })),
    updateUserSession: newLoggedStatus =>
      set(() => ({
        isLoggedIn: newLoggedStatus
      })),
    updateUser: newUser => {
      console.log(newUser)
      set(() => ({ user: newUser }))
    },
    resetStore: () =>
      set(() => ({
        user: initialState.user,
        active_project: initialState.active_project,
        isLoggedIn: initialState.isLoggedIn,
        currentPage: initialState.currentPage,
        previousPage: initialState.previousPage
      }))
  }
})

const useStore = createSelectors(baseStore)

export default useStore
