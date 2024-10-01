import { useEffect } from "react"

import { sendToBackground } from "@plasmohq/messaging"

import "./components/normalize.css"

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

  return (
    <Layout>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative"
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
      </div>
    </Layout>
  )
}

export default IndexPopup
