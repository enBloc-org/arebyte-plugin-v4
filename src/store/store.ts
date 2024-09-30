import { create } from "zustand"

import type { ProjectResponse } from "~types/projectTypes"
import type { User } from "~types/userTypes"

import createSelectors from "./createSelectors"

export type PlayList = typeof baseStore<
  State["user"]["audience_member"]["playlist"]
>

type State = {
  user: User
  active_project?: ProjectResponse
  currentPage: string
}

type Actions = {
  updateCurrentProject: (project: ProjectResponse) => void
  navigateTo: (nextPage: "home" | "profile" | "explore" | "login") => void
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
    currentPage: "home",
    navigateTo: nextPage =>
      set(() => ({
        currentPage: nextPage
      })),
    updateCurrentProject: project =>
      set(() => ({ active_project: project }))
  }
})

const useStore = createSelectors(baseStore)

export default useStore
