import { useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"

const CloseAllPopupsButton = () => {
  const [hasError, setHasError] = useState<boolean>(false)
  const clickHandler = async () => {
    setHasError(false)
    const response = await sendToBackground({
      name: "closeAllPopups"
    })

    if (response === "error") setHasError(true)
  }

  return (
    <div className="controls-button--container">
      <button
        className="info--button"
        type="button"
        onClick={clickHandler}
      >
        CLOSE ALL POPUPS
      </button>
      {hasError && (
        <p className="controls-message__error">
          Something went wrong, try again.
        </p>
      )}
    </div>
  )
}

export default CloseAllPopupsButton
