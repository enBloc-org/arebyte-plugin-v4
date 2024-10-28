import qs from "qs"

export default function popupsListQuery(
  pageNumber: number,
  targetIds: Array<number>
) {
  const popupsQuery = {
    fields: ["*"],
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
    },
    pagination: {
      page: pageNumber,
      pageSize: 6
    },
    filters: {
      id: {
        $in: targetIds
      }
    }
  }

  const popupsListQuery = qs.stringify(popupsQuery, {
    encodedValuesOnly: true
  })

  return popupsListQuery
}
