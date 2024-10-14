import { create } from "zustand"

import type {
  CurrentProjectData,
} from "~types/projectTypes"
import type { User } from "~types/userTypes"

import createSelectors from "./createSelectors"

export type PlayList = typeof baseStore<
  State["user"]["audience_member"]["playlist"]
>

interface State {
  user: User
  active_project?: CurrentProjectData
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
  updateCurrentProject: (project: CurrentProjectData) => void
  navigateTo: (nextPage: State["currentPage"]) => void
  updateUserSession: (newLoggedStatus: boolean) => void
  updateExploreProjectId: (id: number) => void
}

const baseStore = create<State & Actions>(set => {
  return {
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
    previousPage: "home",
    exploreProjectId: undefined,
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
    updateExploreProjectId: id =>
      set(() => ({ exploreProjectId: id }))
  }
})

const useStore = createSelectors(baseStore)

export default useStore
