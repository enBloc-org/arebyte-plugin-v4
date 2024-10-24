import type { UserSession } from "~types/userTypes"

import backgroundPopupCreate from "./popup-utils/backgroundPopCreate"
import getCurrentProjectPopups from "./getCurrentProjectPopups"
import getProjectPopups from "./getProjectPopups"
import iterateIndex from "./iterateIndex"
import newStorage from "./newStorage"
import updateStorage from "./updateStorage"

export default async function eventAlarmListener(alarm) {
  if (alarm.name !== "sequence-alarm") return
  const storage = newStorage()
  const userSession: UserSession = await storage.get(
    "arebyte-audience-session"
  )

  if (userSession) {
    const projectId = userSession.project_id
    const currentIndex = userSession.current_index

    const pop_ups =
      projectId === 0
        ? await getCurrentProjectPopups(currentIndex)
        : await getProjectPopups(projectId, currentIndex)

    await backgroundPopupCreate(pop_ups)
    const newIndex = iterateIndex(pop_ups, currentIndex)

    const updatedSession = updateStorage(userSession, {
      current_index: newIndex,
      ...(newIndex === 0 && { project_id: 0 })
    })
    await storage.set("arebyte-audience-session", updatedSession)
  } else {
    const publicIndex: number = await storage.get(
      "arebyte-public-index"
    )

    const pop_ups = await getCurrentProjectPopups(publicIndex)
    await backgroundPopupCreate(pop_ups)

    const newPublicIndex = iterateIndex(pop_ups, publicIndex)
    await storage.set("arebyte-public-index", newPublicIndex)
  }
}
