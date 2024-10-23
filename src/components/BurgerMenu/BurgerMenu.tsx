import { useState } from "react"

import "./BurgerMenu.css"

import arebyte from "data-base64:assets/arebyte-Plugin-blue.png"

import useStore from "~store/store"

export default function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const navigateTo = useStore.use.navigateTo()
  const currentPage = useStore.use.currentPage()
  const isLoggedIn = useStore.use.isLoggedIn()

  const handleModal = () => setIsOpen(previous => !previous)

  const handleNavigate: typeof navigateTo = target =>
    currentPage === target ? setIsOpen(false) : navigateTo(target)

  return (
    <div className="burger">
      <div className="burger--heading">
        <img src={arebyte} alt="arebyte plugin official logo" />
        <button
          type="button"
          className={`button--secondary burger--logo ${isOpen ? "burger--logo__active" : ""}`}
          onClick={handleModal}
          aria-label={isOpen ? "close menu" : "open menu"}
          aria-expanded={isOpen}
        >
          <svg
            viewBox="0 0 110 50"
            width="40"
            height="40"
            fill="var(--highlight)"
          >
            <rect width="100" height="15"></rect>
            <rect y="25" width="100" height="15"></rect>
            <rect y="50" width="100" height="15"></rect>
          </svg>
        </button>
      </div>
      <div
        className={`burger--modal grid background__stripped ${isOpen ? "burger--modal__active" : "burger--modal__inactive"}`}
      >
        <div className="burger--navigation content-box shadow">
          <button
            className="text-xl button--secondary"
            onClick={() => handleNavigate("home")}
          >
            HOME
          </button>
          <button
            className="text-xl button--secondary"
            onClick={() => handleNavigate("explore")}
          >
            EXPLORE
          </button>

          {isLoggedIn ? (
            <>
            <button className='button--secondary text-xl' onClick={()=>handleNavigate("profile")}>my account</button>
            <button className='button--secondary text-xl' onClick={()=>handleNavigate("favorites")}>favourites</button>
            </>
          ) : (
            <button
              className="text-xl button--secondary"
              onClick={() => handleNavigate("login")}
            >
              LOGIN
            </button>
          )}
        </div>
        <div className="burger--contact">
          <div>
            <a
              target="_blank"
              href="https://www.instagram.com/arebyte/?hl=en-gb"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="30"
                height="30"
                viewBox="0 5 60 64"
                fill="var(--highlight)"
              >
                <path d="M 31.820312 12 C 13.439312 12 12 13.439312 12 31.820312 L 12 32.179688 C 12 50.560688 13.439312 52 31.820312 52 L 32.179688 52 C 50.560688 52 52 50.560688 52 32.179688 L 52 32 C 52 13.452 50.548 12 32 12 L 31.820312 12 z M 28 16 L 36 16 C 47.129 16 48 16.871 48 28 L 48 36 C 48 47.129 47.129 48 36 48 L 28 48 C 16.871 48 16 47.129 16 36 L 16 28 C 16 16.871 16.871 16 28 16 z M 41.994141 20 C 40.889141 20.003 39.997 20.900859 40 22.005859 C 40.003 23.110859 40.900859 24.003 42.005859 24 C 43.110859 23.997 44.003 23.099141 44 21.994141 C 43.997 20.889141 43.099141 19.997 41.994141 20 z M 31.976562 22 C 26.454563 22.013 21.987 26.501437 22 32.023438 C 22.013 37.545437 26.501437 42.013 32.023438 42 C 37.545437 41.987 42.013 37.498562 42 31.976562 C 41.987 26.454563 37.498562 21.987 31.976562 22 z M 31.986328 26 C 35.299328 25.992 37.992 28.673328 38 31.986328 C 38.007 35.299328 35.326672 37.992 32.013672 38 C 28.700672 38.008 26.008 35.327672 26 32.013672 C 25.992 28.700672 28.673328 26.008 31.986328 26 z"></path>
              </svg>
            </a>
            <a
              target="_blank"
              href="https://twitter.com/arebyte?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="30"
                height="30"
                viewBox="-10 5 50 32"
                fill="var(--highlight)"
              >
                <path d="M 4.0175781 4 L 13.091797 17.609375 L 4.3359375 28 L 6.9511719 28 L 14.246094 19.34375 L 20.017578 28 L 20.552734 28 L 28.015625 28 L 18.712891 14.042969 L 27.175781 4 L 24.560547 4 L 17.558594 12.310547 L 12.017578 4 L 4.0175781 4 z M 7.7558594 6 L 10.947266 6 L 24.279297 26 L 21.087891 26 L 7.7558594 6 z"></path>
              </svg>
            </a>
            <a
              target="_blank"
              href="https://www.youtube.com/channel/UC14v907NZBlRVXyV7xkxIIQ"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="30"
                height="25"
                viewBox="0 5 50 50"
                fill="var(--highlight)"
              >
                <path d="M 44.898438 14.5 C 44.5 12.300781 42.601563 10.699219 40.398438 10.199219 C 37.101563 9.5 31 9 24.398438 9 C 17.800781 9 11.601563 9.5 8.300781 10.199219 C 6.101563 10.699219 4.199219 12.199219 3.800781 14.5 C 3.398438 17 3 20.5 3 25 C 3 29.5 3.398438 33 3.898438 35.5 C 4.300781 37.699219 6.199219 39.300781 8.398438 39.800781 C 11.898438 40.5 17.898438 41 24.5 41 C 31.101563 41 37.101563 40.5 40.601563 39.800781 C 42.800781 39.300781 44.699219 37.800781 45.101563 35.5 C 45.5 33 46 29.398438 46.101563 25 C 45.898438 20.5 45.398438 17 44.898438 14.5 Z M 19 32 L 19 18 L 31.199219 25 Z"></path>
              </svg>
            </a>
          </div>
          <div>
            <button className="button--secondary bold">ABOUT</button>
            <button className="button--secondary bold">
              CONTACT
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
