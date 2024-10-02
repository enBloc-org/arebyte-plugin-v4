import { useFormik } from "formik"

import useStore from "~store/store"
import newStorage from "~utils/newStorage"

import "~components/LoginPage/LoginPage.css"

import { useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"

export default function LoginPage() {
  const navigateTo = useStore.use.navigateTo()
  const [errorMessage, setErrorMessage] = useState("")
  const storage = newStorage()

  const { handleSubmit, handleChange } = useFormik({
    initialValues: {
      identifier: "",
      password: ""
    },
    onSubmit: async values => {
      const response = await sendToBackground({
        name: "loginToStrapi",
        body: JSON.stringify(values)
      })

      if (response.error)
        return setErrorMessage(response.error.message)

      await storage.set("arebyte-audience-token", response.jwt)
      navigateTo("home")
    }
  })

  return (
    <div className="login-page main grid background__stripped">
      <button
        className="button--primary login--button__back"
        onClick={() => navigateTo("home")}
      >
        back
      </button>
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
        <button type="submit" className="button--primary">
          submit
        </button>
      </form>
      {errorMessage && (
        <p className="error-message text-lg">{errorMessage}</p>
      )}
    </div>
  )
}
