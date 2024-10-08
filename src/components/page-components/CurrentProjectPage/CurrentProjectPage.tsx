import useStore from "~store/store"

import "./CurrentProjectPage.css"

import BackButton from "~components/BackButton/BackButton"
import CuratorDetails from "~components/CuratorDetails/CuratorDetails"
import Footer from "~components/Footer/Footer"
import ProjectDetails from "~components/ProjectDetails/ProjectDetails"
import type { ProjectData } from "~types/projectTypes"

const CurrentProjectPage = () => {
  const active_project = useStore.use.active_project()
  const project = active_project.data as ProjectData

  return (
    <>
      <main className="current-project page">
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

export default CurrentProjectPage
