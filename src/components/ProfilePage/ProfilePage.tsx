import BackButton from "~components/BackButton/BackButton"
import useStore from "~store/store"
import newStorage from "~utils/newStorage"

import "./ProfilePage.css"

export default function ProfilePage() {
  const navigateTo = useStore.use.navigateTo()
  const storage = newStorage()

  return (
    <div className="profile-page page">
      <h1>this is the profile page</h1>
      <button type="button" onClick={() => navigateTo("explore")}>
        e x p l o r e
      </button>
      <button onClick={async () => await storage.removeAll()}>
        Log out
      </button>
      <BackButton />
    </div>
  )
}
