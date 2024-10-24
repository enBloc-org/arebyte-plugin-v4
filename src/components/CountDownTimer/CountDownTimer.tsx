import { useEffect, useState } from "react"

import useStore from "~store/store"

import "./CountDownTimer.css"

export default function CountDownTimer() {
  const [tHours, setTHours] = useState(0)
  const [tMinutes, setTMinutes] = useState(0)
  const [tSeconds, setTSeconds] = useState(0)

  const { event_time } = useStore.use.user()
  const { is_paused } = useStore.use.user()

  useEffect(() => {
    const timer = setInterval(() => {
      const rightNow = new Date()
      const targetTime = new Date()

      const [targetHour, targetMinute, targetSecond] =
        event_time.split(":")

      targetTime.setHours(parseInt(targetHour))
      targetTime.setMinutes(parseInt(targetMinute))
      targetTime.setSeconds(parseInt(targetSecond))

      const difference = targetTime.valueOf() - rightNow.valueOf()

      const newHour = Math.floor((difference / (1000 * 60 * 60)) % 24)
      const newMinute = Math.floor((difference / (1000 * 60)) % 60)
      const newSecond = Math.floor((difference / 1000) % 60)

      setTHours(newHour < 0 ? newHour + 24 : newHour)
      setTMinutes(newMinute < 0 ? newMinute + 60 : newMinute)
      setTSeconds(newSecond < 0 ? newSecond + 60 : newSecond)
    }, 1000)

    return () => clearInterval(timer)
  }, [event_time])

  return (
    <div className="content-box timer-container shadow">
      <p className="container-label">COMING UP IN</p>
      <div className="flex center">
        {is_paused ? (
          <h2>--:--:-- </h2>
        ) : (
          <h2>
            {tHours.toString().length === 1
              ? "0" + tHours.toString()
              : tHours}
            :
            {tMinutes.toString().length === 1
              ? "0" + tMinutes.toString()
              : tMinutes}
            :
            {tSeconds.toString().length === 1
              ? "0" + tSeconds.toString()
              : tSeconds}
          </h2>
        )}
      </div>
    </div>
  )
}
