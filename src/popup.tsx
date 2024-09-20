import { useEffect, useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"

import "./components/normalize.css"

import Layout from "./components/Layout/Layout"

function IndexPopup() {
  const [testMessage, setTestMessage] = useState("initial message")

  useEffect(() => {
    setTestMessage("effect message")

    const handleMessage = async () => {
      const response = await sendToBackground({
        name: "set_context"
      })

      setTestMessage(response.message)
    }

    handleMessage()
  }, [])

  return (
    <Layout>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <h1>{testMessage}</h1>
      </div>
    </Layout>
  )
}

export default IndexPopup
