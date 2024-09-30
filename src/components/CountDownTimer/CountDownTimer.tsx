import { useEffect, useState } from "react"

import useStore from "~store/store"

export default function CountDownTimer() {
  const [tHours, setTHours] = useState(0)
  const [tMinutes, setTMinutes] = useState(0)
  const [tSeconds, setTSeconds] = useState(0)

  const {
    audience_member: { event_time }
  } = useStore.use.user()

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
  }, [])

  return (
    <h2>
      {tHours} : {tMinutes} : {tSeconds}
    </h2>
  )
}
