import { useEffect } from "react"

import { sendToBackground } from "@plasmohq/messaging"

import CountDownTimer from "~components/CountDownTimer/CountDownTimer"

import "./HomePage.css"

import BurgerMenu from "~components/BurgerMenu/BurgerMenu"
import useStore from "~store/store"
import Footer from "~components/Footer/Footer"

export default function HomePage() {
  const active_project = useStore.use.active_project()
  const updateCurrentProject = useStore.use.updateCurrentProject()
  const userInfo = useStore.use.user()
  const currentIndex = userInfo.audience_member.current_index

  useEffect(() => {
    const fetchCurrentProject = async () => {
      const response = await sendToBackground({
        name: "fetchCurrentProject"
      })
      updateCurrentProject(response)
    }

    fetchCurrentProject()
  }, [])

  const formatDate = dateString => {
    return new Date(dateString).toLocaleDateString("en-uk", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric"
    })
  }

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
                </table>
              </div>
            </div>
            <div className="home-project-thumbnail stack">
              <h3 className="container-label">CURRENT PROJECT</h3>
              <button
                className="content-box home-project__button shadow padding-0"
                type="button"
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
                    Currated By:{" "}
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
