import qs from "qs"

import { TagData } from "~types/projectTypes"

export default function allProjectsQueryString(
  pageNumber: number,
  tags?: TagData[]
) {
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
    },
    ...(tags &&
      tags.length > 0 && {
        filters: {
          tags: {
            $or: tags.map(tag => ({
              id: {
                $eq: tag.id
              }
            }))
          }
        }
      })
  }

  const queryString = qs.stringify(allProjectsQuery, {
    encodeValuesOnly: true
  })

  return queryString
}
