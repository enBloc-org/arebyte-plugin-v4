import BackButton from "~components/BackButton/BackButton"
import Footer from "~components/Footer/Footer"
import EyeIcon from "~components/Icons/EyeIcon"
import SlashedEyeIcon from "~components/Icons/SlashedEyeIcon"

import "./SignUpPage.css"

import { useFormik } from "formik"
import { useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"

import useStore from "~store/store"

const SignUpPage = () => {
  const navigateTo = useStore.use.navigateTo()
  const [errorMessage, setErrorMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const { handleSubmit, handleChange } = useFormik({
    initialValues: {
      username: "",
      identifier: "",
      password: "",
      location: "",
      dateOfBirth: new Date()
    },
    onSubmit: async values => {
      setErrorMessage("")
      setIsLoading(true)
      console.log("====================================")
      console.log(values)
      console.log("====================================")
      // const {
      //   jwt,
      //   user,
      //   error: authError
      // } = await sendToBackground({
      //   name: "loginToStrapi",
      //   body: JSON.stringify(values)
      // })

      // if (error) {
      //   setIsLoading(false)
      //   return setErrorMessage(error)
      // }
    }
  })
  return (
    <div className="sign-up-page page background__stripped">
      <BackButton />
      <main>
        <form className="login--form" onSubmit={handleSubmit}>
          <legend className="bold">SIGN UP</legend>
          <input
            name="username"
            className="content-box shadow login--input"
            type="email"
            placeholder="Username*"
            required={true}
            onChange={handleChange}
          />
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
            <input
              name="-repeat-password"
              className="content-box shadow login--input"
              type={showPassword ? "text" : "password"}
              placeholder="Repeat Password*"
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
              <button onClick={() => navigateTo("sign-up")}>
                No account yet? Register here
              </button>
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

export default SignUpPage
