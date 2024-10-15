import { sendToBackground } from "@plasmohq/messaging"

import "./ExploreProjectPage.css"

import { useEffect, useState } from "react"
import { useErrorBoundary } from "react-error-boundary"

import BackButton from "~components/BackButton/BackButton"
import CuratorDetails from "~components/CuratorDetails/CuratorDetails"
import Footer from "~components/Footer/Footer"
import ProjectDetails from "~components/ProjectDetails/ProjectDetails"
import SelectProjectButton from "~components/SelectProjectButton/SelectProjectButton"
import useStore from "~store/store"
import type {
  ProjectData,
  ProjectResponse
} from "~types/projectTypes"

const ExploreProjectPage = () => {
  const [project, setProject] = useState<ProjectData>()
  const exploreProjectId = useStore.use.exploreProjectId()
  const { showBoundary } = useErrorBoundary()

  useEffect(() => {
    const fetchProject = async () => {
      const { data, error }: ProjectResponse = await sendToBackground(
        {
          name: "fetchProjectDetailsById",
          body: {
            id: exploreProjectId
          }
        }
      )
      if (error) showBoundary(error)
      setProject(data)
    }
    fetchProject()
  }, [])

  return (
    <>
      {project && (
        <main className="explore-project page">
          <BackButton className="explore-project__back-button" />
          <img
            src={
              process.env.PLASMO_PUBLIC_API_URL +
              project.cover_image.formats.small.url
            }
            alt={project.cover_image.alternativeText || project.title}
          />
          <div className="grid project-details__container">
            <ProjectDetails project={project} />
            <SelectProjectButton />
            <CuratorDetails curator={project.content_creator} />
          </div>
          <Footer />
        </main>
      )}
    </>
  )
}

export default ExploreProjectPage
