import useStore from "~store/store"

import "./CurrentProjectPage.css"

import BackButton from "~components/BackButton/BackButton"
import CuratorDetails from "~components/CuratorDetails/CuratorDetails"
import Footer from "~components/Footer/Footer"
import ProjectDetails from "~components/ProjectDetails/ProjectDetails"
import determineImgSrc from "~utils/determineImgSrc"

const CurrentProjectPage = () => {
  const currentProject = useStore.use.currentProject()

  return (
    <>
      <main className="current-project page">
        <BackButton className="current-project__back-button" />
        <img
          src={determineImgSrc(currentProject.cover_image.url)}
          alt={
            currentProject.cover_image.alternativeText ||
            "Project image thumbnail"
          }
          className="current-project--image"
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
