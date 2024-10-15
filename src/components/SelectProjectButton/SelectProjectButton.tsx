import "./SelectProjectButton.css"

import useStore from "~store/store"

export default function SelectProjectButton(projectId: number) {
  const {
    audience_member: { project_id: currentProjectId }
  } = useStore.use.user()
  const isLoggedIn = useStore.use.isLoggedIn()

  return (
    <button
      className="button--primary shadow text-md select-project-button"
      disabled={projectId === currentProjectId || !isLoggedIn}
    >
      {projectId === currentProjectId
        ? "this is your current project"
        : "make this current project"}
    </button>
  )
}
