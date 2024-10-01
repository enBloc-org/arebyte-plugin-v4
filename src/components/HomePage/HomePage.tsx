import { useEffect } from "react"

import { sendToBackground } from "@plasmohq/messaging"

import CountDownTimer from "~components/CountDownTimer/CountDownTimer"

import "./HomePage.css"

import useStore from "~store/store"

export default function HomePage() {
  const active_project = useStore.use.active_project()
  const updateCurrentProject = useStore.use.updateCurrentProject()
  const navigateTo = useStore.use.navigateTo()

  useEffect(() => {
    const fetchCurrentProject = async () => {
      const response = await sendToBackground({
        name: "fetchCurrentProject"
      })
      updateCurrentProject(response)
    }

    fetchCurrentProject()
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
    <div className="home-page">
      <h1>Home Page</h1>
      <CountDownTimer />
      {active_project && (
        <div className="content-box shadow__public">
          <h2>{active_project.data.project.title}</h2>
          <img
            src={
              process.env.PLASMO_PUBLIC_API_URL +
              active_project.data.project.cover_image.formats
                .thumbnail.url
            }
            alt=""
          />
          <button
            className="button--primary"
            type="button"
            onClick={() => navigateTo("profile")}
          >
            p r o f i l e
          </button>
        </div>
      )}
      <button style={{ marginTop: '40px' }} onClick={triggerPopups}>
        Trigger Popups
      </button>
    </div>
  )
}
