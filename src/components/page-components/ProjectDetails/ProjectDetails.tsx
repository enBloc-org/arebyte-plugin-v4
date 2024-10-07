import useStore from "~store/store"

import "./ProjectDetails.css"

import { BlocksRenderer } from "@strapi/blocks-react-renderer"
import { useState } from "react"

import Footer from "~components/Footer/Footer"
import SocialLinks from "~components/SocialLinks/SocialLinks"
import formatDate from "~utils/formatDate"

const ProjectDetails = () => {
  const active_project = useStore.use.active_project()
  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  const [toggleContent, setToggleContent] = useState<boolean>(true)

  const clickHandler = () => {
    setIsExpanded(prev => !prev)
    setToggleContent(prev => !prev)
  }

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
        <div className="content-box shadow padding-lg project-details-description">
          <h2>{active_project.data.project.title}</h2>
          <p>
            Curated by{" "}
            {active_project.data.project.content_creator.artist_name}
          </p>
          <p>Launched: {active_project.data.project.launch_date}</p>
          <button
            className="flex center"
            aria-controls="read-more-content"
            onClick={clickHandler}
          >
            <span
              className="read-more__icon"
              aria-expanded={isExpanded}
            >
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
              <BlocksRenderer
                content={active_project.data.project.description}
              />
            </div>
          </div>
        </div>
        <div className="content-box shadow stack padding-lg project-curator-details">
          <h3 className="content-label">Content Curator</h3>
          <h2>
            {active_project.data.project.content_creator.artist_name}
          </h2>
          <BlocksRenderer
            content={active_project.data.project.content_creator.bio}
          />
          <div className="margin-top-lg">
            <h3>Up & Coming Events</h3>
            <div className="flex project-upcoming-events">
              {active_project.data.project.content_creator.upcoming_events.map(
                event => {
                  return (
                    <div key={event.id}>
                      <h4>{event.event_name}</h4>
                      <p>{event.event_location}</p>
                      <p>{formatDate(event.event_date)}</p>
                    </div>
                  )
                }
              )}
            </div>
            <SocialLinks
              socialMediaLinks={
                active_project.data.project.content_creator
                  .social_media_links
              }
            />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

export default ProjectDetails
