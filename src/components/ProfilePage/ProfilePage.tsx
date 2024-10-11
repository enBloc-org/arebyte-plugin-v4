import useStore from "~store/store"
import newStorage from "~utils/newStorage"

import "./ProfilePage.css"

import BurgerMenu from "~components/BurgerMenu/BurgerMenu"

export default function ProfilePage() {
  const navigateTo = useStore.use.navigateTo()
  const store = newStorage()

  return (
    <div className="profile-page page background__stripped">
      <BurgerMenu />
      <main className="grid">
        <div className="content-box shadow profile-page--user-details">
          <h3>USERNAME</h3>
          <button className="flex center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="0.8em"
              height="0.8em"
              viewBox="0 0 32 32"
            >
              <path
                fill="currentColor"
                d="M3 2.98c0-.569.477-.978 1-.98c.163 0 .33.039.489.125l23.986 13.02c.344.186.525.52.525.855s-.181.67-.525.856L4.49 29.876A1 1 0 0 1 4 30c-.523-.002-1-.411-1-.98z"
              />
            </svg>
            Account Settings
          </button>
        </div>

        <div className="profile-page--controls flex flex-column start">
          <span className="flex">
            <input type="checkbox" id="quiet-mode"></input>
            <label htmlFor="quiet-mode">QUIET MODE ON / OFF</label>
          </span>
          <span className="flex">
            <input type="checkbox" id="on-off"></input>
            <label htmlFor="on-off">ON / OFF</label>
          </span>
        </div>

        <button
          type="button"
          onClick={async () => {
            await store.remove("arebyte-audience-session")
            navigateTo("home")
          }}
        >
          Log Off
        </button>
      </main>
    </div>
  )
}
