import { Form, Formik } from "formik"
import { useErrorBoundary } from "react-error-boundary"
import * as Yup from "yup"

import useStore from "~store/store"
import newStorage from "~utils/newStorage"

import "./ProfilePage.css"

import { useEffect, useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"

import BurgerMenu from "~components/BurgerMenu/BurgerMenu"
import Footer from "~components/Footer/Footer"
import FormInput from "~components/Forms/PasswordInput/FormInput"
import ToggleSwitch from "~components/ToggleSwitch/ToggleSwitch"
import type { User, UserSession } from "~types/userTypes"
import formatTimeString from "~utils/formatTimeString"

export default function ProfilePage() {
  const storage = newStorage()
  const navigateTo = useStore.use.navigateTo()
  const resetStore = useStore.use.resetStore()
  const userInfo = useStore.use.user()
  const { is_paused: isPaused } = useStore.use.user()
  const updatedIsPaused = useStore.use.updateIsPaused()
  const updateUser = useStore.use.updateUser()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { showBoundary } = useErrorBoundary()

  useEffect(() => {
    const getUserDetails = async () => {
      const userSession: UserSession = await storage.get(
        "arebyte-audience-session"
      )
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

  const handlePausedSwitchClick = async () => {
    const { data, error }: { data: User; error: string | null } =
      await sendToBackground({
        name: "updateUserDetails",
        body: { is_paused: !isPaused }
      })
    if (error) showBoundary(error)
    updatedIsPaused(!isPaused)

    if (!isPaused) {
      const [selectedHour, selectedMinute] =
        data.event_time.split(":")
      await sendToBackground({
        name: "updateEventAlarm",
        body: { eventHour: selectedHour, eventMinute: selectedMinute }
      })
    } else {
      await sendToBackground({ name: "removeEventAlarm" })
    }
  }

  const handleLogOff = async () => {
    await storage.remove("arebyte-audience-session")
    resetStore()
    navigateTo("home")
  }

  return (
    userInfo && (
      <div className="profile-page page background__stripped">
        <BurgerMenu />
        <main className="grid profile-page--main">
          <div className="content-box shadow profile-page--user-details">
            <h3 className="profile-page--user-name">
              {userInfo.username}
            </h3>

            <Formik
              initialValues={{
                username: userInfo.username,
                email: userInfo.email,
                birth_date: userInfo.birth_date,
                location: userInfo.location,
                event_time: userInfo.event_time
              }}
              enableReinitialize={true}
              validationSchema={Yup.object({
                username: Yup.string()
                  .min(3, "Must be longer then 3 characters")
                  .max(15, "Must be 15 characters or less")
                  .required("Required"),
                email: Yup.string()
                  .min(6, "Must be longer then 6 characters")
                  .email("Invalid email address")
                  .required("Required"),
                location: Yup.string()
                  .min(5, "Location entry is too short")
                  .matches(/[^\W]{3}/gi)
                  .required("Please enter your location"),
                event_time: Yup.string().required(
                  "Please select a preferred time for your popups"
                )
              })}
              onSubmit={async (values, actions) => {
                setIsLoading(true)
                const eventTime = formatTimeString(values.event_time)

                const {
                  data,
                  error
                }: { data: User; error: string | null } =
                  await sendToBackground({
                    name: "updateUserDetails",
                    body: {
                      username: values.username,
                      email: values.email,
                      birth_date: values.birth_date,
                      location: values.location,
                      event_time: eventTime
                    }
                  })
                if (error) showBoundary(error)
                if (data.event_time !== userInfo.event_time) {
                  const [selectedHour, selectedMinute] =
                    data.event_time.split(":")
                  await sendToBackground({
                    name: "updateEventAlarm",
                    body: {
                      eventHour: parseInt(selectedHour),
                      eventMinute: parseInt(selectedMinute)
                    }
                  })
                }

                setIsLoading(false)
                setIsOpen(false)
                return actions.setSubmitting(false)
              }}
            >
              <Form
                id="account-settings"
                className="profile-page--form flex flex-column"
                aria-hidden={!isOpen}
              >
                <label htmlFor="username">Username</label>
                <FormInput
                  placeholder={userInfo.username}
                  name="username"
                  type="text"
                />
                <label htmlFor="email">Email address</label>
                <FormInput
                  placeholder={userInfo.email}
                  name="email"
                  type="email"
                />
                <label htmlFor="birth_date">Date of birth</label>
                <FormInput
                  placeholder={userInfo.birth_date}
                  name="birth_date"
                  type="date"
                />
                <label htmlFor="location">Location</label>
                <FormInput
                  placeholder={userInfo.location}
                  name="location"
                  type="text"
                />
                <label htmlFor="event_time">
                  Your preferred time to receive popups
                </label>
                <FormInput
                  placeholder={userInfo.event_time}
                  name="event_time"
                  type="time"
                  isDisabled={userInfo.is_paused}
                />
                <button
                  type="submit"
                  className="button--primary"
                  disabled={isLoading}
                >
                  submit
                </button>
              </Form>
            </Formik>
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
  )
}
