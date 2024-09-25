export default function calculateCountDown(
  hours: number,
  minutes: number
) {
  const targetTime = new Date()
  targetTime.setHours(hours, minutes, 0, 0)
  const rightNow = new Date()

  if (rightNow.getTime() > targetTime.getTime()) {
    targetTime.setDate(targetTime.getDate() + 1)
  }

  return targetTime.valueOf() - rightNow.valueOf()
}
