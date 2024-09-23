// utils
import useStore from "~store/store"

// styles
import "./components/normalize.css"

// components
import Layout from "./components/Layout/Layout"

function IndexPopup() {
  const currentProject = useStore.use.currentProject()

  return (
    <Layout>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <h2>{currentProject}</h2>
      </div>
    </Layout>
  )
}

export default IndexPopup
