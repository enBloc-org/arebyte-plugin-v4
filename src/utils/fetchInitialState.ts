export default function fetchInitialState() {
  if (process.env.NODE_ENV === "development") {
    return {
      message: "test message",
      number: 269
    }
  }
  return {
    message: "initial message",
    number: 1
  }
}
