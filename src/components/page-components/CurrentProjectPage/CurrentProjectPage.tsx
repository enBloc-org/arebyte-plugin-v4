import useStore from "~store/store"

import "./CurrentProjectPage.css"

import BackButton from "~components/BackButton/BackButton"
import CuratorDetails from "~components/CuratorDetails/CuratorDetails"
import Footer from "~components/Footer/Footer"
import ProjectDetails from "~components/ProjectDetails/ProjectDetails"

const CurrentProjectPage = () => {
  const currentProject = useStore.use.currentProject()

  return (
    <>
      <main className="current-project page">
        <BackButton className="current-project__back-button" />
        <img
          src={
            process.env.PLASMO_PUBLIC_API_URL +
            currentProject.cover_image.formats.small.url
          }
          alt={
            currentProject.cover_image.alternativeText ||
            "Project image thumbnail"
          }
        />
        <div className="grid project-details__container">
          <ProjectDetails project={currentProject} />
          <CuratorDetails curator={currentProject.content_creator} />
        </div>
        <Footer />
      </main>
    </>
  )
}

export default CurrentProjectPage
