import qs from "qs"

const currentProjectQuery = {
  fields: ["id"],
  populate: {
    project: {
      fields: ["id", "title", "launch_date", "description"],
      populate: {
        cover_image: {
          fields: ["*"]
        },
        events: {
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
