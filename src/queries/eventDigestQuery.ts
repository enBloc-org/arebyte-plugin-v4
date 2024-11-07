import qs from "qs"

export function eventDigestQueryString(
  pageNumber: number,
  projectId: number
) {
  const eventDigestQuery = {
    fields: ["*"],
    populate: {
      pop_ups: {
        populate: {
          thumbnail_image: {
            populate: {
              formats: {
                populate: {
                  thumbnail: {
                    fields: ["url"]
                  }
                }
              }
            }
          }
        }
      }
    },
    pagination: {
      page: pageNumber,
      pageSize: 7
    },
    filters: {
      in_project: {
        id: {
          $eq: projectId
        }
      }
    }
  }

  const queryString = qs.stringify(eventDigestQuery, {
    encodedValuesOnly: true
  })

  return queryString
}
