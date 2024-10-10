import type { ProjectData } from "~types/projectTypes"

import "./ProjectCard.css"

import useStore from "~store/store"
import formatDate from "~utils/formatDate"

const ProjectCard = ({
  project
}: {
  project: Omit<
    ProjectData,
    "content_creator" | "events" | "description"
  >
}) => {
  const updateExploreProjectId = useStore.use.updateExploreProjectId()
  const navigateTo = useStore.use.navigateTo()

  const clickHandler = () => {
    updateExploreProjectId(project.id)
    navigateTo("explore-project")
  }
  return (
    <button className="project-card" onClick={clickHandler}>
      <img
        src={
          process.env.PLASMO_PUBLIC_API_URL +
          project.cover_image.formats.thumbnail.url
        }
        alt={project.cover_image.alternativeText}
        className="shadow"
      />
      <h3>{project.title}</h3>
      <span>From {formatDate(project.launch_date)}</span>
    </button>
  )
}

export default ProjectCard
