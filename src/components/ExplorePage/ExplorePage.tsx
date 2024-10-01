import useStore from "~store/store"

import "./ExplorePage.css"

export default function ExplorePage() {
  const navigateTo = useStore.use.navigateTo()

  return (
    <div className="explore-page">
      <h1>Opa! This is the Explore page</h1>
      <button type="button" onClick={() => navigateTo("home")}>
        h o m e
      </button>
    </div>
  )
}
