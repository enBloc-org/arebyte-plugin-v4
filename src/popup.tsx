import { useEffect } from "react"

import { sendToBackground } from "@plasmohq/messaging"

import "~components/normalize.css"

import Layout from "~components/Layout/Layout"
import useStore from "~store/store"

type image = {
  url: string
  width: number
  height: number
  alt: string
  left?: number
  top?: number
  right?: number
  bottom?: number
}

const images: image[] = [
  {
    url: "https://picsum.photos/200/300",
    width: 200,
    height: 300,
    alt: "Alt text 1",
    left: 0,
    top: 0
  },
  {
    url: "https://picsum.photos/500/700",
    width: 500,
    height: 700,
    alt: "Alt text 2",
    top: 0,
    right: 0
  }
]

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
        images: images
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
