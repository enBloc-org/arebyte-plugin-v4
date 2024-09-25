import { useEffect, useState } from "react"

import useStore from "~store/store"
import calculateCountDown from "~utils/calculateCountDown"

export default function CountDownTimer() {
  const [tHours, setTHours] = useState(0)
  const [tMinutes, setTMinutes] = useState(0)
  const [tSeconds, setTSeconds] = useState(0)
  const [timeCount, setTimeCount] = useState(0)

  const {
    audience_member: { event_time }
  } = useStore.use.user()

  useEffect(() => {
    const [targetHour, targetMinute, targetSecond] =
      event_time.split(":")
    const rightNow = new Date()
    const timeToEvent = calculateCountDown(
      parseInt(targetHour),
      parseInt(targetMinute)
    )

    const timer = setInterval(() => {
      setTimeCount(new Date().valueOf() - timeToEvent)
      setTHours(24 - (rightNow.getHours() - parseInt(targetHour)))
      setTMinutes(
        60 - (rightNow.getMinutes() - parseInt(targetMinute))
      )
      setTSeconds(
        60 - (rightNow.getSeconds() - parseInt(targetSecond))
      )
    }, 1000)

    return () => clearInterval(timer)
  }, [timeCount, event_time])

  return (
    <h2>
      {tHours} : {tMinutes} : {tSeconds}
    </h2>
  )
}
