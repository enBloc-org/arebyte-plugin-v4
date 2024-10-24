import qs from "qs"

const popupQuery = {
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

export const popupQueryString = qs.stringify(popupQuery, {
  encodedValuesOnly: true
})
