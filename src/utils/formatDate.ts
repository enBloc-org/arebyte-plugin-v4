const formatDate = dateString => {
  return new Date(dateString).toLocaleDateString("en-uk", {
    year: "numeric",
    month: "short",
    day: "numeric"
  })
}

export default formatDate
