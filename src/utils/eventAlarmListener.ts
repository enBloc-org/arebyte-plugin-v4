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

  if (userSession) {
    const {
      data: user,
      error
    }: { data: User; error: string | null } =
      await fetchStrapiContent<User>(
        `api/users/${userSession.id}?${userQueryString}`,
        "GET",
        userSession.jwt
      )
    if (error) console.error(error)

    const { popUps, numberOfEvents, timeDelay } =
      user.project_id === 0
        ? await getCurrentProjectPopups(user.current_index)
        : await getProjectPopups(user.project_id, user.current_index)

    if (user.is_paused) {
      const newCounter = iterateIndex(
        numberOfEvents,
        user.digest_counter
      )
      const response = await fetchStrapiContent<User>(
        `api/users/${userSession.id}`,
        "PUT",
        userSession.jwt,
        JSON.stringify({
          digest_counter: newCounter
        })
      )
      if (response.error) console.error(response.error)
      return
    }

    await backgroundPopupCreate(popUps, timeDelay)
    const newIndex = iterateIndex(numberOfEvents, user.current_index)
    const newCounter = iterateIndex(
      numberOfEvents,
      user.digest_counter
    )

    const response = await fetchStrapiContent<User>(
      `api/users/${userSession.id}`,
      "PUT",
      userSession.jwt,
      JSON.stringify({
        current_index: newIndex,
        ...(newIndex === 0 && { project_id: 0 }),
        digest_counter: newCounter
      })
    )
    if (response.error) console.error(response.error)
  } else {
    const publicIndex: number = await storage.get(
      "arebyte-public-index"
    )

    const { popUps, numberOfEvents, timeDelay } =
      await getCurrentProjectPopups(publicIndex)
    await backgroundPopupCreate(popUps, timeDelay)

    const newPublicIndex = iterateIndex(numberOfEvents, publicIndex)
    await storage.set("arebyte-public-index", newPublicIndex)
  }
}
