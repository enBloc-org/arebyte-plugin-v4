import { useFormik } from "formik"

import useStore from "~store/store"

import "~components/LoginPage/LoginPage.css"

import { sendToBackground } from "@plasmohq/messaging"

export default function LoginPage() {
  const navigateTo = useStore.use.navigateTo()

  const { handleSubmit, handleChange } = useFormik({
    initialValues: {
      identifier: "",
      password: ""
    },
    onSubmit: async values => {
      const result: string = await sendToBackground({
        name: "loginToStrapi",
        body: JSON.stringify(values)
      })
      console.log(result)
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
    </div>
  )
}
