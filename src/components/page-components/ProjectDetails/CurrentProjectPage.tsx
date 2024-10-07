import useStore from "~store/store"

import "./CurrentProjectPage.css"

import CuratorDetails from "~components/CuratorDetails/CuratorDetails"
import Footer from "~components/Footer/Footer"
import ProjectDetails from "~components/ProjectDetails/ProjectDetails"

const CurrentProjectPage = () => {
  const active_project = useStore.use.active_project()

  return (
    <main className="project-details page">
      <img
        src={
          process.env.PLASMO_PUBLIC_API_URL +
          active_project.data.project.cover_image.formats.small.url
        }
        alt={
          active_project.data.project.cover_image.alternativeText ||
          "Project image thumbnail"
        }
      />
      <div className="grid project-details__container">
        <ProjectDetails project={active_project.data.project} />
        <CuratorDetails
          curator={active_project.data.project.content_creator}
        />
      </div>
      <Footer />
    </main>
  )
}

export default CurrentProjectPage
