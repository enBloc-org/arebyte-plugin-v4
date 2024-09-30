import { useState } from "react"

import "./BurgerMenu.css"

import useStore from "~store/store"

export default function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(true)
  const navigateTo = useStore.use.navigateTo()

  const clickHandler = () => setIsOpen(!isOpen)

  return (
    <div className="burger">
      <button type="button" onClick={clickHandler}>
        <svg
          viewBox="0 0 100 80"
          width="40"
          height="40"
          fill="var(--highlight)"
        >
          <rect width="100" height="20"></rect>
          <rect y="30" width="100" height="20"></rect>
          <rect y="60" width="100" height="20"></rect>
        </svg>
      </button>
      {isOpen && (
        <div className="burger--modal grid">
          <button
            className="burger--close-button"
            type="button"
            onClick={clickHandler}
          >
            X
          </button>
          <div className="burger--navigation content-box shadow__public">
            <p className="text-lg" onClick={() => setIsOpen(!isOpen)}>
              HOME
            </p>
            <p
              className="text-lg"
              onClick={() => navigateTo("explore")}
            >
              EXPLORE
            </p>
            <p className="text-lg">LOGIN</p>
          </div>
          <div className="burger--contact">
            <div>
              <p>⚔️</p>
              <p>📸</p>
              <p>📺</p>
            </div>
            <div>
              <button>About</button>
              <button>Contact</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
