import { type PlasmoMessaging } from "@plasmohq/messaging"

import { eventDigestQueryString } from "~queries/eventDigestQuery"
import { FullProject } from "~types/projectTypes"
import type { User, UserSession } from "~types/userTypes"
import { fetchStrapiContent } from "~utils/fetchStrapiContent"
import generatePagination from "~utils/generatePagination"
import newStorage from "~utils/newStorage"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const storage = newStorage()
  const userSession: UserSession = await storage.get(
    "arebyte-audience-session"
  )
  const digestDayCount: number = await storage.get(
    "arebyte-digest-count"
  )

  const {
    data: userData,
    error
  }: { data: User; error: string | null } = await fetchStrapiContent(
    `api/users/${userSession.id}`,
    "GET",
    userSession.jwt
  )
  if (error) {
    console.error(error)
  }

  const { pageNumber, pageSize } = generatePagination(digestDayCount)
  const newQuery = eventDigestQueryString(
    pageNumber,
    pageSize,
    userData.project_id
  )

  const response = await fetchStrapiContent<FullProject>(
    `api/events?${newQuery}`
  )
  if (response.error) {
    console.error(response.error)
    res.send(response)
  }

  res.send(response)
}

export default handler
