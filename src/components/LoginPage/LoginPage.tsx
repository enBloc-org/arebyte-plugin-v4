import { useFormik } from "formik"
import { useErrorBoundary } from "react-error-boundary"

import { useStorage } from "@plasmohq/storage/hook"

import useStore from "~store/store"

import "~components/LoginPage/LoginPage.css"

import { useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"

import BackButton from "~components/BackButton/BackButton"
import Footer from "~components/Footer/Footer"
import EyeIcon from "~components/Icons/EyeIcon"
import SlashedEyeIcon from "~components/Icons/SlashedEyeIcon"
import { User, UserSession } from "~types/userTypes"

export default function LoginPage() {
  const navigateTo = useStore.use.navigateTo()
  const [errorMessage, setErrorMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [, setUserSession] = useStorage("arebyte-audience-session")
  const [showPassword, setShowPassword] = useState(false)
  const { showBoundary } = useErrorBoundary()

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
        user,
        error: authError
      } = await sendToBackground({
        name: "loginToStrapi",
        body: JSON.stringify(values)
      })

      if (authError) {
        setIsLoading(false)
        return setErrorMessage(authError)
      }

      const { data, error }: { data: User; error: string | null } =
        await sendToBackground({
          name: "fetchUserProfile",
          body: { jwt: jwt, id: user.id }
        })

      if (error) showBoundary(error)

      const userSession: UserSession = {
        user: {
          id: data.id,
          username: data.username,
          email: data.email,
          birth_date: data.birth_date,
          location: data.location,
          audience_member: {
            is_quiet: data.audience_member.is_quiet,
            is_paused: data.audience_member.is_paused,
            project_id: data.audience_member.project_id,
            current_index: data.audience_member.current_index,
            event_time: data.audience_member.event_time,
            playlist: []
          }
        },
        jwt
      }
      setUserSession(userSession)
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
          <div className="password-input-container">
            <input
              name="password"
              className="content-box shadow login--input"
              type={showPassword ? "text" : "password"}
              placeholder="Password*"
              required={true}
              onChange={handleChange}
            />
            <button
              type="button"
              className="password-toggle-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <SlashedEyeIcon width="16px" height="16px" />
              ) : (
                <EyeIcon width="16px" height="16px" />
              )}
            </button>
          </div>
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
