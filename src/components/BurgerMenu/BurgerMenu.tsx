import { useState } from "react"

import "./BurgerMenu.css"

export default function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const clickHandler = () => setIsOpen(!isOpen)

  return (
    <div>
      <button type="button" onClick={clickHandler}>
        <svg viewBox="0 0 100 80" width="40" height="40" fill="blue">
          <rect width="100" height="20"></rect>
          <rect y="30" width="100" height="20"></rect>
          <rect y="60" width="100" height="20"></rect>
        </svg>
      </button>
      {isOpen && (
        <div className="burger--modal">
          <h1>OPEN</h1>
        </div>
      )}
    </div>
  )
}
