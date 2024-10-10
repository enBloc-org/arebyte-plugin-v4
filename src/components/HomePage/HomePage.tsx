import { useEffect, useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"

import CountDownTimer from "~components/CountDownTimer/CountDownTimer"

import "./HomePage.css"

import BurgerMenu from "~components/BurgerMenu/BurgerMenu"
import Footer from "~components/Footer/Footer"
import useStore from "~store/store"
import { CurrentProjectResponse } from "~types/projectTypes"
import formatDate from "~utils/formatDate"

export default function HomePage() {
  const userInfo = useStore.use.user()
  const currentIndex = userInfo.audience_member.current_index
  const navigateTo = useStore.use.navigateTo()
  const [currentProject, setCurrentProject] = useState<
    CurrentProjectResponse | undefined
  >(undefined)

  useEffect(() => {
    const getUserSession = async () => {
      const response = await sendToBackground({
        name: "fetchCurrentProject"
      })
      setCurrentProject(response)
    }
    getUserSession()
  }, [])

  return (
    <div className="home-page page">
      <BurgerMenu />
      <main className="grid">
        <CountDownTimer />
        {currentProject && (
          <>
            <div className="home-up-next content-box shadow">
              <p className="container-label">UP NEXT</p>
              <div className="stack home-up-next-description">
                <h2 className="text-lg">
                  {
                    currentProject.data.project.events[currentIndex]
                      .title
                  }
                </h2>
                <table>
                  <tbody>
                    <tr>
                      <td>Part of:</td>
                      <td> {currentProject.data.project.title}</td>
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
                        {currentProject.data.project.events.length}
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
                    currentProject.data.project.cover_image.formats
                      .thumbnail.url
                  }
                  alt={
                    currentProject.data.project.cover_image
                      .alternativeText
                  }
                />
                <div className="home-project-thumbnail-description stack">
                  <h3>{currentProject.data.project.title}</h3>
                  <p>
                    Curated By:{" "}
                    {
                      currentProject.data.project.content_creator
                        .curator_name
                    }
                  </p>
                  <p>
                    Launched:{" "}
                    {formatDate(
                      currentProject.data.project.launch_date
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
