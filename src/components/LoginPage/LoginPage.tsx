import { useFormik } from "formik"

import useStore from "~store/store"
import newStorage from "~utils/newStorage"

import "~components/LoginPage/LoginPage.css"

import { useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"

import BackButton from "~components/BackButton/BackButton"

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
      const { jwt, error } = await sendToBackground({
        name: "loginToStrapi",
        body: JSON.stringify(values)
      })

      if (error) {
        setIsLoading(false)
        return setErrorMessage(error.message)
      }

      await storage.set("arebyte-audience-token", jwt)
      navigateTo("home")
    }
  })

  return (
    <div className="login-page main grid background__stripped">
      <BackButton />
      <form className="login--form" onSubmit={handleSubmit}>
        <legend className="bold">LOGIN</legend>
        <input
          name="identifier"
          className="content-box shadow__public login--input"
          type="email"
          placeholder="Email*"
          required={true}
          onChange={handleChange}
        />
        <input
          name="password"
          className="content-box shadow__public login--input"
          type="text"
          placeholder="Password*"
          required={true}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="button--primary"
          disabled={isLoading}
        >
          submit
        </button>
      </form>
      {isLoading && (
        <span className="error-message text-lg">Loading ...</span>
      )}
      {errorMessage && (
        <p className="error-message text-lg">{errorMessage}</p>
      )}
    </div>
  )
}
