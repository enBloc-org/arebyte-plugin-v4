import { useFormik } from "formik"

import { useStorage } from "@plasmohq/storage/hook"

import useStore from "~store/store"

import "~components/LoginPage/LoginPage.css"

import { useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"

import BackButton from "~components/BackButton/BackButton"
import Footer from "~components/Footer/Footer"
import EyeIcon from "~components/Icons/EyeIcon"
import SlashedEyeIcon from "~components/Icons/SlashedEyeIcon"
import { UserSession } from "~types/userTypes"

export default function LoginPage() {
  const navigateTo = useStore.use.navigateTo()
  const [errorMessage, setErrorMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [, setUserSession] = useStorage("arebyte-audience-session")
  const [showPassword, setShowPassword] = useState(false)

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

      const userData = await sendToBackground({
        name: "fetchUserProfile",
        body: { jwt: jwt, id: user.id }
      })

      const userSession: UserSession = {
        user: {
          id: userData.id,
          username: userData.username,
          email: userData.email,
          birth_date: userData.birth_date,
          location: userData.location,
          audience_member: {
            ...userData.audience_member
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
