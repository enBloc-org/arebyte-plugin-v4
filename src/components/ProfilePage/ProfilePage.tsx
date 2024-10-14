import { useStorage } from "@plasmohq/storage/hook"

import BackButton from "~components/BackButton/BackButton"
import useStore from "~store/store"

import "./ProfilePage.css"

export default function ProfilePage() {
  const navigateTo = useStore.use.navigateTo()
  const resetStore = useStore.use.resetStore()
  const [, , { remove }] = useStorage("arebyte-audience-session")

  return (
    <div className="profile-page page">
      <h1>this is the profile page</h1>
      <button type="button" onClick={() => navigateTo("explore")}>
        e x p l o r e
      </button>
      <button
        onClick={() => {
          remove()
          resetStore()
        }}
      >
        Log out
      </button>
      <BackButton />
    </div>
  )
}
