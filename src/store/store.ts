import { create } from "zustand"

import type { ProjectData } from "~types/projectTypes"
import type { User } from "~types/userTypes"

import createSelectors from "./createSelectors"

export type PlayList = typeof baseStore<State["user"]["playlist"]>

interface State {
  user: User
  currentProject: ProjectData
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
  updateCurrentProject: (project: ProjectData) => void
  navigateTo: (nextPage: State["currentPage"]) => void
  updateUser: (newUser: Partial<User>) => void
  resetStore: () => void
  updateExploreProjectId: (id: number) => void
  updateIsPaused: (newStatus: boolean) => void
}

const initialState: State = {
  user: {
    id: undefined,
    username: undefined,
    email: undefined,
    birth_date: undefined,
    location: undefined,
    is_paused: false,
    project_id: 0,
    current_index: 0,
    event_time: "12:00:00.000",
    playlist: []
  },
  isLoggedIn: false,
  currentPage: "home",
  previousPage: "home",
  exploreProjectId: undefined,
  currentProject: undefined
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
      set(state => ({
        user: {
          ...state.user,
          ...newUser
        },
        isLoggedIn: true
      }))
    },
    resetStore: () =>
      set(() => ({
        user: initialState.user,
        isLoggedIn: initialState.isLoggedIn,
        currentPage: initialState.currentPage,
        previousPage: initialState.previousPage,
        currentProject: initialState.currentProject
      })),
    updateCurrentProject: project =>
      set(() => ({ currentProject: project })),
    updateExploreProjectId: (id: number) =>
      set(() => ({ exploreProjectId: id })),
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
