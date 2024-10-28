import qs from "qs"

const favouritesQuery = {
  fields: ["id"],
  populate: {
    favourites: {
      fields: ["id"]
    }
  }
}

export const userFavouritesQueryString = qs.stringify(
  favouritesQuery,
  {
    encodedValuesOnly: true
  }
)
