import type { ProjectData } from "~types/projectTypes"

import "./ProjectCard.css"

const ProjectCard = ({ project }: { project: ProjectData }) => {
  return (
    <button className="project-card">
      <img
        src={
          process.env.PLASMO_PUBLIC_API_URL +
          project.cover_image.formats.thumbnail.url
        }
        alt={project.cover_image.alternativeText}
        className="shadow"
      />
      <h3>{project.title}</h3>
    </button>
  )
}

export default ProjectCard
