import qs from "qs"

const currentProjectQuery = {
  fields: ["id", "event_time"],
  populate: {
    project: {
      fields: ["id", "title", "launch_date", "description"],
      populate: {
        cover_image: {
          fields: ["*"]
        },
        events: {
          fields: ["*"]
        },
        content_creator: {
          fields: ["curator_name", "curator_organisation", "bio"],
          populate: {
            organisation_logo: {
              fields: ["*"],
            },
            upcoming_events: {
              fields: ["*"]
            },
            social_media_links: {
              fields: ["*"]
            }
          }
        }
      }
    }
  }
}

export const currentProjectQueryString = qs.stringify(
  currentProjectQuery,
  { encodeValuesOnly: true }
)
