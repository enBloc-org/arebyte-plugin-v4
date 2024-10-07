import "./ExploreProjectPage.css"

import { useEffect, useState } from "react"

import BackButton from "~components/BackButton/BackButton"
import CuratorDetails from "~components/CuratorDetails/CuratorDetails"
import Footer from "~components/Footer/Footer"
import ProjectDetails from "~components/ProjectDetails/ProjectDetails"
import { projectQueryString } from "~queries/projectQuery"
import type {
  ProjectData,
  ProjectResponse
} from "~types/projectTypes"
import { fetchStrapiContent } from "~utils/fetchStrapiContent"

const ExploreProjectPage = () => {
  const [project, setProject] = useState<ProjectData>()
  console.log(projectQueryString)

  useEffect(() => {
    const fetchProject = async () => {
      console.log(projectQueryString)

      const response = await fetchStrapiContent<ProjectResponse>(
        `api/projects/1?${projectQueryString}`
      )
      setProject(response.data as ProjectData)
    }
    fetchProject()
  }, [])

  return (
    <>
      <main className="explore-project page">
        <BackButton className="current-project__back-button" />
        <img
          src={
            process.env.PLASMO_PUBLIC_API_URL +
            project.cover_image.formats.small.url
          }
          alt={
            project.cover_image.alternativeText ||
            "Project image thumbnail"
          }
        />
        <div className="grid project-details__container">
          <ProjectDetails project={project} />
          <CuratorDetails curator={project.content_creator} />
        </div>
        <Footer />
      </main>
    </>
  )
}

export default ExploreProjectPage
