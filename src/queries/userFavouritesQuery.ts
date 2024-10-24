import qs from "qs"

const favouritesQuery = {
  fields: ["id"],
  populate: {
    favourites: {
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

export const userFavouritesQueryString = qs.stringify(
  favouritesQuery,
  { encodedValuesOnly: true }
)
