import { useErrorBoundary } from "react-error-boundary"

import "./ErrorFallback.css"

import arebyte from "data-base64:assets/arebyte-Plugin-blue.png"

const FallBack = ({ error }) => {
  const { resetBoundary } = useErrorBoundary()

  return (
    <main className="error-page">
      <img
        src={arebyte}
        alt="Arebyte Plugin Logo"
        className="error-logo"
      />
      <div className="margin-top-lg stack error-message">
        <p>Something went wrong:</p>
        <p style={{ color: "red" }}>{error.message}</p>
        <button
          className="button--primary margin-top-lg"
          onClick={resetBoundary}
        >
          Try Again
        </button>
      </div>
    </main>
  )
}

export default FallBack
