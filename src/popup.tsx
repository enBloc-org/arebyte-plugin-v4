import { useEffect, useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"

// utils
import useStore from "~store/store"

// styles
import "./components/normalize.css"

//types
import type { ProjectResponse } from "~types/projectTypes"

// components
import Layout from "./components/Layout/Layout"

function IndexPopup() {
  const currentProjectFromStore = useStore.use.currentProject()
  const [currentProject, setCurrentProject] =
    useState<ProjectResponse>()

  useEffect(() => {
    const updateCurrentProject = async () => {
      const response = await sendToBackground({
        name: "fetchCurrentProject"
      })
      console.log("Hi from useEffect")
      console.log({ response })
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
          <h2>
            {
              currentProject.data.attributes.project.data.attributes
                .title
            }
          </h2>
        )}
        <h3>{currentProjectFromStore}</h3>
      </div>
    </Layout>
  )
}

export default IndexPopup
