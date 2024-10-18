import { useFormik } from "formik"
import { useErrorBoundary } from "react-error-boundary"

import { useStorage } from "@plasmohq/storage/hook"

import useStore from "~store/store"

import "./ProfilePage.css"

import { useEffect, useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"

import BurgerMenu from "~components/BurgerMenu/BurgerMenu"
import Footer from "~components/Footer/Footer"
import ToggleSwitch from "~components/ToggleSwitch/ToggleSwitch"
import type { User, UserSession } from "~types/userTypes"

export default function ProfilePage() {
  const navigateTo = useStore.use.navigateTo()
  const resetStore = useStore.use.resetStore()
  const userInfo = useStore.use.user()
  const { is_paused: isPaused } = useStore.use.user()
  const updatedIsPaused = useStore.use.updateIsPaused()
  const updateUser = useStore.use.updateUser()
  const [userSession, , { remove }] = useStorage<UserSession>(
    "arebyte-audience-session"
  )
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { showBoundary } = useErrorBoundary()

  useEffect(() => {
    const getUserDetails = async () => {
      const { data, error }: { data: User; error: string | null } =
        await sendToBackground({
          name: "fetchUserProfile",
          body: { jwt: userSession.jwt, id: userSession.id }
        })

      if (error) showBoundary(error)
      updateUser(data)
    }

    if (userInfo.username === undefined) {
      getUserDetails()
    }
  }, [])

  console.log(userInfo)
  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      userName: userInfo.username,
      emailAddress: userInfo.email,
      birthDate: userInfo.birth_date,
      location: userInfo.location,
      eventTime: userInfo.event_time
    },
    onSubmit: async values => {
      console.log(values)

      // send values to CMS
      // fetch user info
      // updateUser() with new values
    }
  })

  const handlePausedSwitchClick = () => {
    updatedIsPaused(!isPaused)
  }

  const handleLogOff = () => {
    remove()
    resetStore()
    navigateTo("home")
  }

  return (
    <div className="profile-page page background__stripped">
      <BurgerMenu />
      <main className="grid profile-page--main">
        <div className="content-box shadow profile-page--user-details">
          <h3 className="profile-page--user-name">
            {userInfo.username}
          </h3>

          <form
            id="account-settings"
            className="profile-page--form flex flex-column"
            aria-hidden={!isOpen}
            onSubmit={handleSubmit}
          >
            <label htmlFor="userName">Username</label>
            <input
              name="userName"
              type="text"
              value={values.userName}
              className="content-box"
              onChange={handleChange}
            />
            <label htmlFor="emailAddress">Email address</label>
            <input
              name="emailAddress"
              type="email"
              value={values.emailAddress}
              className="content-box"
              onChange={handleChange}
            />
            <label htmlFor="birthDate">Date of birth</label>
            <input
              name="birthDate"
              type="date"
              value={values.birthDate}
              className="content-box"
              onChange={handleChange}
            />
            <label htmlFor="location">Location</label>
            <input
              name="location"
              type="text"
              value={values.location}
              className="content-box"
              onChange={handleChange}
            />
            <label htmlFor="eventTime">
              Your preferred time to receive popups
            </label>
            <input
              name="eventTime"
              type="time"
              value={values.eventTime}
              className="content-box"
              onChange={handleChange}
            />
            <button type="submit" className="button--primary">
              submit
            </button>
          </form>
          <div className="profile-page--modal-buttons">
            <button
              className={`${isOpen ? "profile-page--arrow-button__open" : "profile-page--arrow-button"}`}
              aria-controls="account-settings"
              onClick={() => setIsOpen(previous => !previous)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="0.8em"
                height="0.8em"
                viewBox="0 0 32 32"
                className="profile-page--arrow-icon"
              >
                <path
                  fill="currentColor"
                  d="M3 2.98c0-.569.477-.978 1-.98c.163 0 .33.039.489.125l23.986 13.02c.344.186.525.52.525.855s-.181.67-.525.856L4.49 29.876A1 1 0 0 1 4 30c-.523-.002-1-.411-1-.98z"
                />
              </svg>
              Account Settings
            </button>

            {isOpen && (
              <button type="button" onClick={handleLogOff}>
                Log me out
              </button>
            )}
          </div>
        </div>

        <div
          className="profile-page--controls flex flex-column start"
          aria-hidden={isOpen}
        >
          <div className="profile-page--toggle-pair">
            <ToggleSwitch
              isChecked={isPaused}
              clickHandler={handlePausedSwitchClick}
            />
            <p>pause</p>
          </div>
          <p>
            This turns off the plugin so you will not receive daily
            popups
          </p>
        </div>
      </main>
      <div className="profile-page--footer">
        <Footer />
      </div>
    </div>
  )
}
