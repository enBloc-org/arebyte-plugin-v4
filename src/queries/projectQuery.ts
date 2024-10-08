import qs from "qs"

const projectQuery = {
  fields: ["id", "title", "launch_date", "description"],
  populate: {
    cover_image: {
      fields: ["*"]
    },
    events: {
      fields: ["*"]
    },
    content_creator: {
      fields: ["curator_name", "bio", "curator_organisation"],
      populate: {
        organisation_logo: {
          fields: ["*"]
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

export const projectQueryString = qs.stringify(projectQuery, {
  encodeValuesOnly: true
})
