import { useEffect } from "react"

import { sendToBackground } from "@plasmohq/messaging"

import CountDownTimer from "~components/CountDownTimer/CountDownTimer"
import newStorage from "~utils/newStorage"

import "./HomePage.css"

import BurgerMenu from "~components/BurgerMenu/BurgerMenu"
import Footer from "~components/Footer/Footer"
import useStore from "~store/store"
import formatDate from "~utils/formatDate"

export default function HomePage() {
  const active_project = useStore.use.active_project()
  const updateCurrentProject = useStore.use.updateCurrentProject()
  const userInfo = useStore.use.user()
  const updateUserSession = useStore.use.updateUserSession()
  const storage = newStorage()
  const currentIndex = userInfo.audience_member.current_index
  const navigateTo = useStore.use.navigateTo()

  useEffect(() => {
    const getUserSession = async () => {
      const response = await sendToBackground({
        name: "fetchCurrentProject"
      })
      updateCurrentProject(response)

      const token = await storage.get("arebyte-audience-token")
      updateUserSession(!!token)
    }

    getUserSession()
  }, [])

  return (
    <div className="home-page page">
      <BurgerMenu />
      <main className="grid">
        <CountDownTimer />
        {active_project && (
          <>
            <div className="home-up-next content-box shadow">
              <p className="container-label">UP NEXT</p>
              <div className="stack home-up-next-description">
                <h2 className="text-lg">
                  {
                    active_project.data.project.events[currentIndex]
                      .title
                  }
                </h2>
                <table>
                  <tbody>
                    <tr>
                      <td>Part of:</td>
                      <td> {active_project.data.project.title}</td>
                    </tr>
                    <tr>
                      <td>Start Time:</td>
                      <td>
                        {userInfo.audience_member.event_time.slice(
                          0,
                          -4
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>Day:</td>
                      <td>
                        {currentIndex + 1} of{" "}
                        {active_project.data.project.events.length}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="home-project-thumbnail stack">
              <h3 className="container-label">CURRENT PROJECT</h3>
              <button
                className="home-project__button shadow padding-0"
                type="button"
                onClick={() => navigateTo("current-project")}
              >
                <img
                  src={
                    process.env.PLASMO_PUBLIC_API_URL +
                    active_project.data.project.cover_image.formats
                      .thumbnail.url
                  }
                  alt={
                    active_project.data.project.cover_image
                      .alternativeText
                  }
                />
                <div className="home-project-thumbnail-description stack">
                  <h3>{active_project.data.project.title}</h3>
                  <p>
                    Curated By:{" "}
                    {
                      active_project.data.project.content_creator
                        .artist_name
                    }
                  </p>
                  <p>
                    Launched:{" "}
                    {formatDate(
                      active_project.data.project.launch_date
                    )}
                  </p>
                </div>
              </button>
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  )
}
