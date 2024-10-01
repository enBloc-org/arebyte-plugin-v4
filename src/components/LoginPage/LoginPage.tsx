import useStore from "~store/store"

import "./LoginPage.css"

export default function LoginPage() {
  const navigateTo = useStore.use.navigateTo()
  return (
    <div className="login-page main grid background__stripped">
      <button
        className="button--primary login--button__back"
        onClick={() => navigateTo("home")}
      >
        back
      </button>
      <form className="login--form">
        <legend className="bold">LOGIN</legend>
        <input
          className="content-box shadow__public login--input"
          type="email"
          placeholder="Email*"
          required={true}
        />
        <input
          className="content-box shadow__public login--input"
          type="text"
          placeholder="Password*"
          required={true}
        />
        <button type="submit" className="button--primary">
          submit
        </button>
      </form>
    </div>
  )
}
