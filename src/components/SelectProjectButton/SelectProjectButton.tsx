import { useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"

import "./SelectProjectButton.css"

import useStore from "~store/store"

export default function SelectProjectButton() {
  const {
    audience_member: { project_id: currentProjectId }
  } = useStore.use.user()
  const isLoggedIn = useStore.use.isLoggedIn()
  const navigateTo = useStore.use.navigateTo()
  const exploreProjectId = useStore.use.exploreProjectId()
  const [isShowingAlarm, setIsShowingAlarm] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleClick = async () => {
    if (!isLoggedIn) return setIsShowingAlarm(true)

    setIsLoading(true)
    const result = await sendToBackground({
      name: "selectNewActiveProject",
      body: { selectedProjectId: exploreProjectId }
    })

    if (result) setIsLoading(false)
  }

  return (
    <>
      {isShowingAlarm && (
        <>
          <div className="select-project-button--warning-backdrop" />
          <div className="select-project-button--warning">
            <button
              className="button--secondary"
              onClick={() => setIsShowingAlarm(false)}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_9_78)">
                  <path
                    d="M2.59766 -0.00195218L0.00244141 2.59326L17.401 19.9919L19.9963 17.3966L2.59766 -0.00195218Z"
                    fill="#0017F8"
                  />
                  <path
                    d="M17.401 -0.00198996L0.00244141 17.3966L2.59766 19.9918L19.9963 2.59322L17.401 -0.00198996Z"
                    fill="#0017F8"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_9_78">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </button>
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 12.4C0 8.85 0 5.3 0 1.75C0 0.33 0.33 0 1.73 0C8.73 0 15.73 0 22.73 0C24.26 0 24.77 0.5 24.77 2.04C24.77 8.98 24.77 15.92 24.77 22.86C24.77 24.26 24.14 24.9 22.68 24.9C15.72 24.91 8.76 24.91 1.81 24.9C0.43 24.9 0.01 24.44 0.01 23.04C0.01 19.49 0.01 15.94 0.01 12.39L0 12.4ZM21.56 3C21.06 2.97 20.7 2.92 20.34 2.92C14.98 2.92 9.62 2.95 4.26 2.89C3.07 2.88 2.85 3.32 2.85 4.39C2.89 9.77 2.86 15.16 2.86 20.54C2.86 20.94 2.9 21.33 2.92 21.81H8.09V8.54H21.55V3H21.56ZM11.26 11.66V21.77H21.52V11.66H11.26Z"
                fill="#0017F8"
              />
            </svg>
            <p className="text-lg">
              Sorry! This feature is for registered users only.
            </p>
            <p className="text-lg">
              Please{" "}
              <span
                className="text-md"
                onClick={() => navigateTo("login")}
              >
                login
              </span>
            </p>
          </div>
        </>
      )}
      <button
        className={`${exploreProjectId === currentProjectId || !isLoggedIn ? "select-project-button__disabled" : "button--primary shadow"} text-md select-project-button`}
        disabled={exploreProjectId === currentProjectId || isLoading}
        onClick={handleClick}
      >
        {exploreProjectId === currentProjectId
          ? "this is your current project"
          : "make this current project"}
      </button>
    </>
  )
}
