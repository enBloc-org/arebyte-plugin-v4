import qs from "qs"

const favouritesQuery = {
  fields: ["id"],
  populate: {
    favourites: {
      fields: ["*"],
      populate: {
        popup_content: {
          fields: ["*"],
          populate: {
            media: {
              fields: ["url"]
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
