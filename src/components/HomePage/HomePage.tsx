import { useEffect } from "react"

import { sendToBackground } from "@plasmohq/messaging"

import useStore from "~store/store"

export default function HomePage() {
  const active_project = useStore.use.active_project()
  const updateCurrentProject = useStore.use.updateCurrentProject()

  useEffect(() => {
    const fetchCurrentProject = async () => {
      const response = await sendToBackground({
        name: "fetchCurrentProject"
      })
      updateCurrentProject(response)
    }

    fetchCurrentProject()
  }, [])

  return (
    <div className="page">
      <h1>Home Page</h1>
      {active_project && (
        <div>
          <h2>{active_project.data.project.title}</h2>
          <img
            src={
              process.env.PLASMO_PUBLIC_API_URL +
              active_project.data.project.cover_image.formats
                .thumbnail.url
            }
            alt=""
          />
        </div>
      )}
    </div>
  )
}
