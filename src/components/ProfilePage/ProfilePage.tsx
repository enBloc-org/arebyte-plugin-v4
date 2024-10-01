import useStore from "~store/store"

import "./ProfilePage.css"

export default function ProfilePage() {
  const navigateTo = useStore.use.navigateTo()
  return (
    <div className="profile-page main">
      <h1>this is the profile page</h1>
      <button type="button" onClick={() => navigateTo("explore")}>
        e x p l o r e
      </button>
    </div>
  )
}
