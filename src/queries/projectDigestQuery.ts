import qs from "qs"

const projectDigestQuery = {
  fields: ["id", "title"],
  populate: {
    sequence: {
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
      }
    }
  }
}

export const projectDigestQueryString = qs.stringify(
  projectDigestQuery,
  {
    encodedValuesOnly: true
  }
)
