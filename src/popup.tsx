import { useEffect } from "react"

import { sendToBackground } from "@plasmohq/messaging"

import "~components/normalize.css"
import "~components/globals.css"

import useStore from "~store/store"

import Layout from "./components/Layout/Layout"

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
            <div className="content-box shadow__public">
              <img
                src={
                  process.env.PLASMO_PUBLIC_API_URL +
                  currentProject.data.project.cover_image.formats
                    .thumbnail.url
                }
                alt=""
              />
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default IndexPopup
