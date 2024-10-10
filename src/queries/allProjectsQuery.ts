import qs from "qs"

const allProjectsQuery = {
  fields: ["id", "title", "launch_date"],
  populate: {
    cover_image: {
      fields: ["*"]
    }
  }
}

export const allProjectQueryString = qs.stringify(allProjectsQuery, {
  encodeValuesOnly: true
})
