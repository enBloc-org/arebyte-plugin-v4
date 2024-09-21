import useStore from "~store/store"

import "./components/normalize.css"

import Layout from "./components/Layout/Layout"

function IndexPopup() {
  const message = useStore.use.message()
  const updateMessage = useStore.use.updateMessage()

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
        <h1>{message}</h1>
        <button onClick={updateMessage}>click me</button>
      </div>
    </Layout>
  )
}

export default IndexPopup
