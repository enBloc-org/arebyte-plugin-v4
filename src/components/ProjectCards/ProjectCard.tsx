import type { ProjectData } from "~types/projectTypes"

import "./ProjectCard.css"

const ProjectCard = ({ project }: { project: ProjectData }) => {
  return (
    <div className="project-card">
      <img
        src={
          process.env.PLASMO_PUBLIC_API_URL +
          project.cover_image.formats.thumbnail.url
        }
        alt={project.cover_image.alternativeText}
        style={{
          height: project.cover_image.formats.thumbnail.height,
          width: project.cover_image.formats.thumbnail.width
        }}
      />
    </div>
  )
}

export default ProjectCard
