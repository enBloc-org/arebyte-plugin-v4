import qs from "qs"

const userQuery = {
  fields: [
    "id",
    "username",
    "email",
    "event_time",
    "project_id",
    "current_index",
    "is_paused",
    "birth_date",
    "location",
  ],
  populate: {
    favourites: {
      fields: ["*"]
    }
  }
}

export const userQueryString = qs.stringify(userQuery, {
  encodeValuesOnly: true
})
