import qs from "qs"

const userQuery = {
  fields: ["id", "username", "email", "birth_date", "location"],
  populate: {
    audience_member: {
      fields: [
        "is_quiet",
        "event_time",
        "project_id",
        "current_index",
        "is_paused"
      ],
      playlist: {
        fields: ["*"]
      }
    }
  }
}

export const userQueryString = qs.stringify(userQuery, {
  encodeValuesOnly: true
})
