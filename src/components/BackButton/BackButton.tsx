import useStore from "~store/store"

import "./BackButton.css"

export default function BackButton() {
  const previousPage = useStore.use.previousPage()
  const navigateTo = useStore.use.navigateTo()

  return (
    <button
      className="back-button text-xl content-box"
      onClick={() => navigateTo(previousPage)}
    >
      <svg
        width="44"
        height="20"
        viewBox="0 0 24 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M24 6.27994H11.11C11.11 3.46994 11.11 0.939941 11.08 0.939941L0.839996 7.29994L11.08 13.6599C11.08 13.6599 11.09 11.1299 11.1 8.31994H23.99V6.26994L24 6.27994Z"
          fill="var(--highlight)"
        />
      </svg>
    </button>
  )
}
