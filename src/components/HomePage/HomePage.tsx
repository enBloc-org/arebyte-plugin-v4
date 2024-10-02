import { useEffect } from "react"

import { sendToBackground } from "@plasmohq/messaging"

import CountDownTimer from "~components/CountDownTimer/CountDownTimer"

import "./HomePage.css"

import BurgerMenu from "~components/BurgerMenu/BurgerMenu"
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

  const triggerPopups = async () => {
    await sendToBackground({
      name: "triggerPopup",
      body: {
        id: 1
      }
    })
  }

  return (
    <div className="home-page page">
      <BurgerMenu />
      <main className="grid">
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
          </div>
        )}
        <button style={{ marginTop: "40px" }} onClick={triggerPopups}>
          Trigger Popups
        </button>
      </main>
    </div>
  )
}
