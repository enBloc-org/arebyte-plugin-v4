import qs from "qs"

const eventPopupQuery = {
  fields: ["*"],
  populate: {
    pop_ups: {
      fields: ["*"],
      populate: {
        popup_content: {
          fields: ["*"],
          populate: {
            media: {
              fields: ["*"]
            }
          }
        }
      }
    }
  }
}

export const eventPopupQueryString = qs.stringify(eventPopupQuery, {
  encodeValuesOnly: true
})
