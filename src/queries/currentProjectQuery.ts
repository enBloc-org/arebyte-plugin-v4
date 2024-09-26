import qs from "qs"

const currentProjectQuery = {
  fields: ["id", "event_time"],
  populate: {
    project: {
      fields: ["id", "title", "launch_date", "description"],
      populate: {
        cover_image: {
          fields: ["*"]
        }
      }
    }
  }
}

export const currentProjectQueryString = qs.stringify(
  currentProjectQuery,
  { encodeValuesOnly: true }
)
