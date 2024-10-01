const NewTab = () => {
  const params = new URLSearchParams(window.location.search)
  const width = params.get("width")
  const height = params.get("height")
  const url = "http://localhost:1337" + params.get("url")

  return (
    <div>
      <img
        src={url}
        alt="an image"
        style={{ width: Number(width), height: Number(height) }}
      />
    </div>
  )
}

export default NewTab
