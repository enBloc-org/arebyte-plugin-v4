import useStore from "~store/store"

import "./components/normalize.css"

import Layout from "./components/Layout/Layout"

function IndexPopup() {
  const message = useStore(state => state.message)
  const updateMessage = useStore(state => state.updateMessage)

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
