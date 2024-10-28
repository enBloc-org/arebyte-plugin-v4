import qs from "qs"

export default function allProjectsQueryString(pageNumber: number) {
  const allProjectsQuery = {
    fields: ["id", "title", "launch_date"],
    populate: {
      cover_image: {
        fields: ["*"]
      }
    },
    pagination: {
      page: pageNumber,
      pageSize: 6
    }
  }

  const allProjectQueryString = qs.stringify(allProjectsQuery, {
    encodeValuesOnly: true
  })

  return allProjectQueryString
}
