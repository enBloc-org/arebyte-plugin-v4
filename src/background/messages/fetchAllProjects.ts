import type { PlasmoMessaging } from "@plasmohq/messaging"

import { allProjectQueryString } from "~queries/allProjectsQuery"
import type { ProjectData } from "~types/projectTypes"
import { fetchStrapiContent } from "~utils/fetchStrapiContent"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const response = await fetchStrapiContent<
    Array<
      Omit<ProjectData, "content_creator" | "events" | "description">
    >
  >(`api/projects?${allProjectQueryString}`)
  res.send(response)
}

export default handler
