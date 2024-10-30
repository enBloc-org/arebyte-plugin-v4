import type { PlasmoMessaging } from "@plasmohq/messaging"

import allProjectsQueryString from "~queries/allProjectsQuery"
import type { ProjectData } from "~types/projectTypes"
import { fetchStrapiContent } from "~utils/fetchStrapiContent"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const { page, tags } = req.body

  const newQueryString = allProjectsQueryString(page, tags)

  const response = await fetchStrapiContent<
    Array<
      Omit<ProjectData, "content_creator" | "events" | "description">
    >
  >(`api/projects?${newQueryString}`)

  res.send(response)
}

export default handler
