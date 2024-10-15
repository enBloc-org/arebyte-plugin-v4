import { sendToBackground } from "@plasmohq/messaging"

import "./SelectProjectButton.css"

import useStore from "~store/store"

export default function SelectProjectButton() {
  const {
    audience_member: { project_id: currentProjectId }
  } = useStore.use.user()
  const isLoggedIn = useStore.use.isLoggedIn()

  const exploreProjectId = useStore.use.exploreProjectId()

  const handleClick = async () => {
    console.log(exploreProjectId)
    await sendToBackground({
      name: "selectNewActiveProject",
      body: { selectedProjectId: exploreProjectId }
    })
  }

  return (
    <button
      className="button--primary shadow text-md select-project-button"
      disabled={exploreProjectId === currentProjectId || !isLoggedIn}
      onClick={handleClick}
    >
      {exploreProjectId === currentProjectId
        ? "this is your current project"
        : "make this current project"}
    </button>
  )
}
