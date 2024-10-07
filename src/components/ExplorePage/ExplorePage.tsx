import useStore from "~store/store"

import "./ExplorePage.css"

export default function ExplorePage() {
  const navigateTo = useStore.use.navigateTo()

  return (
    <div className="explore-page page">
      <h1>Opa! This is the Explore page</h1>
      <button type="button" onClick={() => navigateTo("home")}>
        h o m e
      </button>
      <br />
      <button type="button" onClick={() => navigateTo("explore-project")}>
        Project 1
      </button>
    </div>
  )
}
