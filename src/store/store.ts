import { create } from "zustand"

import type { ProjectData } from "~types/projectTypes"
import type { User, UserSession } from "~types/userTypes"

import createSelectors from "./createSelectors"

export type PlayList = typeof baseStore<
  State["user"]["audience_member"]["playlist"]
>

interface State {
  user: User
  active_project: ProjectData
  isLoggedIn: boolean
  exploreProjectId: number
  previousPage: State["currentPage"]
  currentPage:
    | "home"
    | "profile"
    | "explore"
    | "login"
    | "current-project"
    | "explore-project"
    | "favourites"
}

interface Actions {
  updateCurrentProject: (project: ProjectData) => void
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
    birth_date: undefined,
    location: undefined,
    audience_member: {
      is_quiet: false,
      is_paused: false,
      project_id: 0,
      current_index: 0,
      event_time: "12:00:00.000",
      playlist: []
    }
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
      set(state => ({
        user: {
          ...state.user,
          id: newUser.id,
          audience_member: {
            ...state.user.audience_member,
            event_time: newUser.event_time,
            project_id: newUser.project_id,
            current_index: newUser.current_index
          }
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
        active_project: initialState.active_project
      })),
    updateCurrentProject: project =>
      set(() => ({ active_project: project })),
    updateExploreProjectId: (id: number) =>
      set(() => ({ exploreProjectId: id }))
  }
})

const useStore = createSelectors(baseStore)

export default useStore
