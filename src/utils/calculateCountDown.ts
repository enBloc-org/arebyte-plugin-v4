/**
 *
 * @param hours
 * @param minutes
 * @returns the UTC value of the target time adjusted for the following day if the time stamp has already passed in the present day
 */
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

  return targetTime.valueOf()
}
