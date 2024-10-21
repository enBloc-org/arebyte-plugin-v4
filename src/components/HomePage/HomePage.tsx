import { useEffect } from "react"

import { sendToBackground } from "@plasmohq/messaging"

import CountDownTimer from "~components/CountDownTimer/CountDownTimer"

import "./HomePage.css"

import { useErrorBoundary } from "react-error-boundary"

import BurgerMenu from "~components/BurgerMenu/BurgerMenu"
import Footer from "~components/Footer/Footer"
import useStore from "~store/store"
import { CurrentProjectData, ProjectData } from "~types/projectTypes"
import formatDate from "~utils/formatDate"

export default function HomePage() {
  const { event_time, project_id, current_index } =
    useStore.use.user()
  const currentProject = useStore.use.currentProject()
  const updateCurrentProject = useStore.use.updateCurrentProject()
  const navigateTo = useStore.use.navigateTo()
  const { showBoundary } = useErrorBoundary()

  useEffect(() => {
    const getUserSession = async () => {
      if (project_id === 0) {
        const {
          data,
          error
        }: { data: CurrentProjectData; error: string | null } =
          await sendToBackground({
            name: "fetchCurrentProject"
          })
        if (error) return showBoundary(error)

        updateCurrentProject(data.project)
      } else {
        const {
          data,
          error
        }: { data: ProjectData; error: string | null } =
          await sendToBackground({
            name: "fetchProjectDetailsById",
            body: { id: project_id }
          })
        if (error) return showBoundary(error)
        updateCurrentProject(data)

        const [setHour, setMinute] = event_time.split(":")
        await sendToBackground({
          name: "updateEventAlarm",
          body: {
            eventHour: parseInt(setHour),
            eventMinute: parseInt(setMinute)
          }
        })
      }
    }
    getUserSession()
  }, [project_id, event_time, current_index])

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
                  {currentProject.events[current_index].title}
                </h2>
                <table>
                  <tbody>
                    <tr>
                      <td>Part of:</td>
                      <td> {currentProject.title}</td>
                    </tr>
                    <tr>
                      <td>Start Time:</td>
                      <td>{event_time.slice(0, -4)}</td>
                    </tr>
                    <tr>
                      <td>Day:</td>
                      <td>
                        {current_index + 1} of{" "}
                        {currentProject.events.length}
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
                    currentProject.cover_image.formats.thumbnail.url
                  }
                  alt={currentProject.cover_image.alternativeText}
                />
                <div className="home-project-thumbnail-description stack">
                  <h3>{currentProject.title}</h3>
                  <p>
                    Curated By:{" "}
                    {currentProject.content_creator.curator_name}
                  </p>
                  <p>
                    Launched: {formatDate(currentProject.launch_date)}
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
