import { useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"

import ToggleSwitch from "~components/ToggleSwitch/ToggleSwitch"
import useStore from "~store/store"
import { User } from "~types/userTypes"

import "./PauseSwitch.css"

const PauseSwitch = ({
  showlabel = true,
  className
}: {
  showlabel?: boolean
  className?: string
}) => {
  const [pausedStateError, setPausedStateError] = useState<
    string | undefined
  >()
  const { is_paused: isPaused } = useStore.use.user()
  const updatedIsPaused = useStore.use.updateIsPaused()

  const handlePausedSwitchClick = async () => {
    const { data, error }: { data: User; error: string | null } =
      await sendToBackground({
        name: "updateUserDetails",
        body: { is_paused: !isPaused }
      })
    if (error)
      setPausedStateError(
        "Something went wrong. Please try again later."
      )
    updatedIsPaused(!isPaused)
    if (!isPaused) {
      const [selectedHour, selectedMinute] =
        data.event_time.split(":")
      const { error } = await sendToBackground({
        name: "updateEventAlarm",
        body: { eventHour: selectedHour, eventMinute: selectedMinute }
      })
      if (error)
        setPausedStateError(
          "Something went wrong. Please try again later."
        )
    } else {
      await sendToBackground({ name: "removeEventAlarm" })
    }
  }

  return (
    <>
      {showlabel && (
        <p>
          {pausedStateError ??
            "This turns off the plugin so you will not receive daily popups"}
        </p>
      )}
      <div className={`profile-page--toggle-pair ${className}`}>
        <ToggleSwitch
          isChecked={isPaused}
          clickHandler={handlePausedSwitchClick}
        />
        <p>pause</p>
      </div>
    </>
  )
}

export default PauseSwitch
