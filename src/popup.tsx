import { useEffect } from "react"

import { sendToBackground } from "@plasmohq/messaging"

import "~components/normalize.css"

import Layout from "~components/Layout/Layout"
import useStore from "~store/store"

function IndexPopup() {
  const currentProject = useStore.use.active_project()
  const setCurrentProject = useStore.use.updateCurrentProject()

  useEffect(() => {
    const updateCurrentProject = async () => {
      const response = await sendToBackground({
        name: "fetchCurrentProject"
      })
      setCurrentProject(response)
    }
    updateCurrentProject()
  }, [])

  const triggerPopups = async () => {
    const resp = await sendToBackground({
      name: "triggerPopup",
      body: {
        id: 1
      }
    })
    console.log(resp)
  }

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
        {currentProject && (
          <div>
            <h2>{currentProject.data.project.title}</h2>
            <img
              src={
                process.env.PLASMO_PUBLIC_API_URL +
                currentProject.data.project.cover_image.formats
                  .thumbnail.url
              }
              alt=""
            />
          </div>
        )}
        <button onClick={triggerPopups}>Trigger Popups</button>
      </div>
    </Layout>
  )
}

export default IndexPopup
