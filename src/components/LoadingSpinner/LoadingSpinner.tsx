import spinner from "data-base64:assets/loading-spinner.svg"
import "./LoadingSpinner.css"

export default function LoadingSpinner() {
  return (
    <img
      className="loading-image"
      src={spinner}
      alt="spinner animation"
    />
  )
}
