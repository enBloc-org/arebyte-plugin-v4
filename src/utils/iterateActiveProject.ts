import { currentProjectQueryString } from "~queries/currentProjectQuery"
import { CurrentProjectResponse } from "~types/projectTypes"

import { fetchStrapiContent } from "./fetchStrapiContent"
  
export default async function iterateActiveProject(
  currentProjectId: number
) {
  try {
    const {
      data: { id: newProjectId }
    } = await fetchStrapiContent<CurrentProjectResponse>(
      `api/current-project?${currentProjectQueryString}`
    )

    return newProjectId
  } catch (error) {
    console.error(error)
    return currentProjectId
  }
}
