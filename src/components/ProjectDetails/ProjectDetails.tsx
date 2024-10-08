import { BlocksRenderer } from "@strapi/blocks-react-renderer"
import { useState } from "react"

import type { ProjectData } from "~types/projectTypes"
import "./ProjectDetails.css"

const ProjectDetails = ({ project }: { project: ProjectData }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  const [toggleContent, setToggleContent] = useState<boolean>(true)

  const clickHandler = () => {
    setIsExpanded(prev => !prev)
    setToggleContent(prev => !prev)
  }

  return (
    <div className="content-box shadow padding-lg project-details-description">
      <h2>{project.title}</h2>
      <p>Curated by {project.content_creator.curator_name}</p>
      <p>Launched: {project.launch_date}</p>
      <button
        className="flex center"
        aria-controls="read-more-content"
        onClick={clickHandler}
      >
        <span className="read-more__icon" aria-expanded={isExpanded}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="0.8em"
            height="0.8em"
            viewBox="0 0 32 32"
          >
            <path
              fill="currentColor"
              d="M3 2.98c0-.569.477-.978 1-.98c.163 0 .33.039.489.125l23.986 13.02c.344.186.525.52.525.855s-.181.67-.525.856L4.49 29.876A1 1 0 0 1 4 30c-.523-.002-1-.411-1-.98z"
            />
          </svg>
        </span>
        More Info
      </button>
      <div
        id="read-more-content"
        className="read-more-content"
        aria-hidden={toggleContent}
      >
        <div>
          <BlocksRenderer content={project.description} />
        </div>
      </div>
    </div>
  )
}

export default ProjectDetails
