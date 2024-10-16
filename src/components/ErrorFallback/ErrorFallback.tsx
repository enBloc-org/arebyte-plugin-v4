import { useErrorBoundary } from "react-error-boundary"

import "./ErrorFallback.css"

import arebyte from "data-base64:assets/arebyte-Plugin-blue.png"

const ErrorFallBack = ({ error }) => {
  const { resetBoundary } = useErrorBoundary()

  return (
    <main className="error-page">
      <img
        src={arebyte}
        alt="Arebyte Plugin Logo"
        className="error-logo"
      />
      <div className="margin-top-lg stack error-message-container">
        <p>Something went wrong:</p>
        <p className="error-message">{error.message}</p>
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

export default ErrorFallBack
