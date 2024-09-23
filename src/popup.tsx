// utils
import useStore from "~store/store"

// styles
import "./components/normalize.css"

// components
import Layout from "./components/Layout/Layout"

function IndexPopup() {
  const message = useStore.use.message()
  const number = useStore.use.number()
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
        <h2>{message}</h2>
        <h3>{number}</h3>
        <button onClick={updateMessage}>click me</button>
      </div>
    </Layout>
  )
}

export default IndexPopup
