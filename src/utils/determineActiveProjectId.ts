import { CurrentProjectData } from "~types/projectTypes"

import { fetchStrapiContent } from "./fetchStrapiContent"

/**
 *
 * @summary evaluates the project_id saved in storage and returns the correct Id of the project that should be targeted in a fetch call
 * @param givenId expects the project_id returned in the stored userSession
 * @returns the id of the current active project
 */
export default async function determineActiveProjectId(
  givenId: number
): Promise<number> {
  if (givenId !== 0) return givenId

  const projectResponse =
    await fetchStrapiContent<CurrentProjectData>(
      `api/current-project`
    )

  if (projectResponse.error) {
    console.error(projectResponse.error)
    return givenId
  }

  return projectResponse.data.id
}
