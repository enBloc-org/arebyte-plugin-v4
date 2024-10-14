import { useEffect } from "react"

import { sendToBackground } from "@plasmohq/messaging"

import CountDownTimer from "~components/CountDownTimer/CountDownTimer"

import "./HomePage.css"

import { useErrorBoundary } from "react-error-boundary"

import BurgerMenu from "~components/BurgerMenu/BurgerMenu"
import Footer from "~components/Footer/Footer"
import useStore from "~store/store"
import formatDate from "~utils/formatDate"

export default function HomePage() {
  const userInfo = useStore.use.user()
  const active_project = useStore.use.active_project()
  const updateCurrentProject = useStore.use.updateCurrentProject()
  const currentIndex = userInfo.audience_member.current_index
  const navigateTo = useStore.use.navigateTo()
  const { showBoundary } = useErrorBoundary()

  useEffect(() => {
    const getUserSession = async () => {
      const { data, error } = await sendToBackground({
        name: "fetchCurrentProject"
      })

      if (error) showBoundary(error)

      updateCurrentProject(data)

      const token = await storage.get("arebyte-audience-token")
      updateUserSession(!!token)
      updateCurrentProject(response)
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
                    active_project.project.events[currentIndex]
                      .title
                  }
                </h2>
                <table>
                  <tbody>
                    <tr>
                      <td>Part of:</td>
                      <td> {active_project.project.title}</td>
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
                        {active_project.project.events.length}
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
                    active_project.project.cover_image.formats
                      .thumbnail.url
                  }
                  alt={
                    active_project.project.cover_image
                      .alternativeText
                  }
                />
                <div className="home-project-thumbnail-description stack">
                  <h3>{active_project.project.title}</h3>
                  <p>
                    Curated By:{" "}
                    {
                      active_project.project.content_creator
                        .curator_name
                    }
                  </p>
                  <p>
                    Launched:{" "}
                    {formatDate(
                      active_project.project.launch_date
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
