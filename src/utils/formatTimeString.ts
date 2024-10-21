export default function formatTimeString(timeString: string) {
  const [hourDigits, minuteDigits] = timeString.split(":")

  return `${hourDigits}:${minuteDigits}:00.000`
}
