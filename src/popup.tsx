import testDataURL from "raw-env:./test.json"

import "./components/normalize.css"

import Layout from "./components/Layout/Layout"

function IndexPopup() {
  return (
    <Layout>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <h1>Pop Pop!</h1>
      </div>
    </Layout>
  )
}

export default IndexPopup
