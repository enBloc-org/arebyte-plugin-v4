import { useEffect } from "react"

import { sendToBackground } from "@plasmohq/messaging"

import CountDownTimer from "~components/CountDownTimer/CountDownTimer"
import newStorage from "~utils/newStorage"

import "./HomePage.css"

import BurgerMenu from "~components/BurgerMenu/BurgerMenu"
import useStore from "~store/store"

export default function HomePage() {
  const active_project = useStore.use.active_project()
  const updateCurrentProject = useStore.use.updateCurrentProject()
  const navigateTo = useStore.use.navigateTo()
  const updateUserSession = useStore.use.updateUserSession()
  const storage = newStorage()

  useEffect(() => {
    const getUserSession = async () => {
      const response = await sendToBackground({
        name: "fetchCurrentProject"
      })
      updateCurrentProject(response)

      const token = storage.get("arebyte-audience-token")
      updateUserSession(!!token)
    }

    getUserSession()
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
    <div className="home-page main">
      <BurgerMenu />
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
      <button style={{ marginTop: "40px" }} onClick={triggerPopups}>
        Trigger Popups
      </button>
    </div>
  )
}
