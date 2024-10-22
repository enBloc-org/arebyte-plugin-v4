/**
 *
 * @param timeString expects the time string retrieved from our data types in the event_time property
 * @returns a string formatted to the appropriate shape for our CMS "00:00:00.000"
 */
export default function formatTimeString(timeString: string) {
  const [hourDigits, minuteDigits] = timeString.split(":")

  return `${hourDigits}:${minuteDigits}:00.000`
}
