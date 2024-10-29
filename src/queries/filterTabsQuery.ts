import qs from "qs"

const filterTabsQuery = {
  fields: ["id", "name"]
}

export const filterTabsQueryString = qs.stringify(filterTabsQuery, {
  encodeValuesOnly: true
})
