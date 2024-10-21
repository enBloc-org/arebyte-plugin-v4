import { create } from "zustand"

import type { CurrentProjectData } from "~types/projectTypes"
import type { User, UserSession } from "~types/userTypes"

import createSelectors from "./createSelectors"

export type PlayList = typeof baseStore<State["user"]["playlist"]>

interface State {
  user: User
  active_project?: CurrentProjectData
  isLoggedIn: boolean
  exploreProjectId: number
  previousPage: State["currentPage"]
  currentPage:
    | "home"
    | "profile"
    | "explore"
    | "login"
    | "sign-up"
    | "current-project"
    | "explore-project"
    | "favourites"
}

interface Actions {
  updateCurrentProject: (project: CurrentProjectData) => void
  navigateTo: (nextPage: State["currentPage"]) => void
  updateUser: (newUser: UserSession) => void
  resetStore: () => void
  updateExploreProjectId: (id: number) => void
  updateIsQuiet: (newStatus: boolean) => void
  updateIsPaused: (newStatus: boolean) => void
}

const initialState: State = {
  user: {
    id: undefined,
    username: undefined,
    email: undefined,
    birth_date: undefined,
    location: undefined,
    is_quiet: false,
    is_paused: false,
    project_id: undefined,
    current_index: 0,
    event_time: "12:00:00.000",
    playlist: []
  },
  isLoggedIn: false,
  currentPage: "home",
  previousPage: "home",
  exploreProjectId: undefined,
  active_project: undefined
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
        previousPage: initialState.previousPage,
        active_project: initialState.active_project
      })),
    updateCurrentProject: project =>
      set(() => ({ active_project: project })),
    updateExploreProjectId: (id: number) =>
      set(() => ({ exploreProjectId: id })),
    updateIsQuiet: newStatus =>
      set(state => ({
        user: {
          ...state.user,
          is_quiet: newStatus
        }
      })),
    updateIsPaused: newStatus =>
      set(state => ({
        user: {
          ...state.user,
          is_paused: newStatus
        }
      }))
  }
})

const useStore = createSelectors(baseStore)

export default useStore
