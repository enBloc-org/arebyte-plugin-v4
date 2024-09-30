import { useState } from "react"

import "./BurgerMenu.css"

import useStore from "~store/store"

export default function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const navigateTo = useStore.use.navigateTo()
  const currentPage = useStore.use.currentPage()

  const handleModal = () => setIsOpen(!isOpen)

  const handleNavigateHome = () =>
    currentPage === "home" ? setIsOpen(false) : navigateTo("home")

  const handleNavigateExplore = () =>
    currentPage === "explore"
      ? setIsOpen(false)
      : navigateTo("explore")

  const handleNavigateLogin = () =>
    currentPage === "login" ? setIsOpen(false) : navigateTo("login")
  return (
    <div className="burger">
      <button
        type="button"
        className="button--secondary"
        onClick={handleModal}
      >
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
            className="burger--close-button button--secondary bold"
            type="button"
            onClick={handleModal}
          >
            X
          </button>
          <div className="burger--navigation content-box shadow__public">
            <button
              className="text-xl button--secondary"
              onClick={handleNavigateHome}
            >
              HOME
            </button>
            <button
              className="text-xl button--secondary"
              onClick={handleNavigateExplore}
            >
              EXPLORE
            </button>
            <button
              className="text-xl button--secondary"
              onClick={handleNavigateLogin}
            >
              LOGIN
            </button>
          </div>
          <div className="burger--contact">
            <div>
              <p>⚔️</p>
              <p>📸</p>
              <p>📺</p>
            </div>
            <div>
              <button className="button--secondary bold">
                ABOUT
              </button>
              <button className="button--secondary bold">
                CONTACT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
