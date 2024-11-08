import { userQueryString } from "~queries/userQuery"
import type { User, UserSession } from "~types/userTypes"

import { fetchStrapiContent } from "./fetchStrapiContent"
import getCurrentProjectPopups from "./getCurrentProjectPopups"
import getProjectPopups from "./getProjectPopups"
import iterateIndex from "./iterateIndex"
import newStorage from "./newStorage"
import backgroundPopupCreate from "./popup-utils/backgroundPopCreate"

export default async function eventAlarmListener(alarm) {
  if (alarm.name !== "sequence-alarm") return
  const storage = newStorage()
  const userSession: UserSession = await storage.get(
    "arebyte-audience-session"
  )
  const digestCount: number = await storage.get(
    "arebyte-digest-count"
  )

  if (userSession) {
    const { data: user, error } = await fetchStrapiContent<User>(
      `api/users/${userSession.id}?${userQueryString}`,
      "GET",
      userSession.jwt
    )
    if (error) console.error(error)

    const { pop_ups, numberOfEvents } =
      user.project_id === 0
        ? await getCurrentProjectPopups(user.current_index)
        : await getProjectPopups(user.project_id, user.current_index)

    await backgroundPopupCreate(pop_ups)
    const newIndex = iterateIndex(numberOfEvents, user.current_index)

    const response = await fetchStrapiContent<User>(
      `api/users/${userSession.id}`,
      "PUT",
      userSession.jwt,
      JSON.stringify({
        current_index: newIndex,
        ...(newIndex === 0 && { project_id: 0 })
      })
    )
    if (response.error) console.error(response.error)
  } else {
    const publicIndex: number = await storage.get(
      "arebyte-public-index"
    )

    const { pop_ups, numberOfEvents } =
      await getCurrentProjectPopups(publicIndex)
    await backgroundPopupCreate(pop_ups)

    const newPublicIndex = iterateIndex(numberOfEvents, publicIndex)
    await storage.set("arebyte-public-index", newPublicIndex)
    await storage.set(
      "arebyte-digest-count",
      newPublicIndex === 0 ? 0 : digestCount + 1
    )
  }
}
