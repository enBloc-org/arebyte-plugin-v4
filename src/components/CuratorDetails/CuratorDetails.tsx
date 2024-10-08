import { BlocksRenderer } from "@strapi/blocks-react-renderer"

import SocialLinks from "~components/SocialLinks/SocialLinks"
import formatDate from "~utils/formatDate"

import "./CuratorDetails.css"

import type { ContentCreator } from "~types/userTypes"

const CuratorDetails = ({ curator }: { curator: ContentCreator }) => {
  return (
    <div className="content-box shadow stack padding-lg curator-details">
      <h2 className="content-label text-md">Content Curator</h2>
      <div className="flex organisation-details">
        {curator.curator_name && <h3>{curator.curator_name}</h3>}
        <div className="flex center gap">
          {curator.curator_organisation && (
            <h3>{curator.curator_organisation}</h3>
          )}
          {curator.organisation_logo && (
            <img
              src={
                process.env.PLASMO_PUBLIC_API_URL +
                curator.organisation_logo.formats.thumbnail.url
              }
              alt={curator.organisation_logo.alternativeText}
              style={{
                width:
                  curator.organisation_logo.formats.thumbnail.width *
                  0.25,
                height:
                  curator.organisation_logo.formats.thumbnail.height *
                  0.25
              }}
            />
          )}
        </div>
      </div>
      <BlocksRenderer content={curator.bio} />
      <div className="margin-top-lg">
        <h3>UP & COMING EVENTS</h3>
        <div className="flex upcoming-events">
          {curator.upcoming_events.map(event => {
            return (
              <div key={event.id}>
                <a href={event.event_link}>
                  <h4>{event.event_name}</h4>
                </a>
                <p>{event.event_location}</p>
                <p>{formatDate(event.event_date)}</p>
              </div>
            )
          })}
        </div>
        <SocialLinks socialMediaLinks={curator.social_media_links} />
      </div>
    </div>
  )
}

export default CuratorDetails
