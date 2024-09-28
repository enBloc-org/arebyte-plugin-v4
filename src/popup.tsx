import "./components/normalize.css"

import HomePage from "~components/HomePage/HomePage"

import Layout from "./components/Layout/Layout"

function IndexPopup() {
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
        <HomePage />
      </div>
    </Layout>
  )
}

export default IndexPopup
