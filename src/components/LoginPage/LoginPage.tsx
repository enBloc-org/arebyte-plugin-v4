import { useFormik } from "formik"

import useStore from "~store/store"
import newStorage from "~utils/newStorage"

import "~components/LoginPage/LoginPage.css"

import { useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"

import BackButton from "~components/BackButton/BackButton"
import Footer from "~components/Footer/Footer"
import { UserSession } from "~types/userTypes"

export default function LoginPage() {
  const navigateTo = useStore.use.navigateTo()
  const [errorMessage, setErrorMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const storage = newStorage()

  const { handleSubmit, handleChange } = useFormik({
    initialValues: {
      identifier: "",
      password: ""
    },
    onSubmit: async values => {
      setErrorMessage("")
      setIsLoading(true)
      const {
        jwt,
        user: { id },
        error: authError
      } = await sendToBackground({
        name: "loginToStrapi",
        body: JSON.stringify(values)
      })

      if (authError) {
        setIsLoading(false)
        return setErrorMessage(authError.message)
      }

      const { data: userData, error: userError } =
        await sendToBackground({
          name: "fetchUserProfile",
          body: { jwt: jwt, id: id }
        })

      if (userError) {
        setIsLoading(false)
        return setErrorMessage(userError.message)
      }

      const userSession: UserSession = {
        jwt: jwt,
        id: id,
        is_paused: userData.is_paused,
        is_quiet: userData.is_quiet,
        event_time: userData.event_time,
        project_id: userData.project_id,
        current_index: userData.current_index
      }

      await storage.set("arebyte-audience-token", userSession)
      navigateTo("home")
    }
  })

  return (
    <div className="login-page page background__stripped">
      <BackButton />
      <main>
        <form className="login--form" onSubmit={handleSubmit}>
          <legend className="bold">LOGIN</legend>
          <input
            name="identifier"
            className="content-box shadow login--input"
            type="email"
            placeholder="Email*"
            required={true}
            onChange={handleChange}
          />
          <input
            name="password"
            className="content-box shadow login--input"
            type="password"
            placeholder="Password*"
            required={true}
            onChange={handleChange}
          />
          <fieldset>
            <button
              type="submit"
              className="button--primary text-md"
              disabled={isLoading}
            >
              submit
            </button>
            <div className="login--account-options">
              <button>Password Recovery</button>
              <button>No account yet? Register here</button>
            </div>
          </fieldset>
        </form>
        {isLoading && (
          <span className="error-message text-lg">Loading ...</span>
        )}
        {errorMessage && (
          <p className="error-message text-lg">{errorMessage}</p>
        )}
      </main>
      <Footer />
    </div>
  )
}
