import { BlocksRenderer } from "@strapi/blocks-react-renderer"

import SocialLinks from "~components/SocialLinks/SocialLinks"
import formatDate from "~utils/formatDate"

import "./CuratorDetails.css"

import type { ContentCreator } from "~types/userTypes"

const CuratorDetails = ({ curator }: { curator: ContentCreator }) => {
  return (
    <div className="content-box shadow stack padding-lg curator-details">
      <h3 className="content-label">Content Curator</h3>
      <h2>{curator.artist_name}</h2>
      <BlocksRenderer content={curator.bio} />
      <div className="margin-top-lg">
        <h3>UP & COMING EVENTS</h3>
        <div className="flex upcoming-events">
          {curator.upcoming_events.map(event => {
            return (
              <div key={event.id}>
                <h4>{event.event_name}</h4>
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
