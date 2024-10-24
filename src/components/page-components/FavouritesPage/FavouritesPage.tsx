import { useEffect, useState } from "react"

import "./FavouritesPage.css"

import { useErrorBoundary } from "react-error-boundary"

import { sendToBackground } from "@plasmohq/messaging"

import BurgerMenu from "~components/BurgerMenu/BurgerMenu"
import Footer from "~components/Footer/Footer"
import PopupCard from "~components/PopupCard/PopupCard"
import ToggleSwitch from "~components/ToggleSwitch/ToggleSwitch"
import type { Popup } from "~types/eventTypes"
import type { User, UserSession } from "~types/userTypes"
import newStorage from "~utils/newStorage"

export default function FavouritesPage() {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const { showBoundary } = useErrorBoundary()
  const [favouritesList, setFavouritesList] = useState<Array<Popup>>(
    []
  )
  const storage = newStorage()

  const handleToggleSwitch = () => {
    setIsEditing(previous => !previous)
  }

  useEffect(() => {
    const getFavourites = async () => {
      const userSession: UserSession = await storage.get(
        "arebyte-audience-session"
      )

      const {
        data,
        error
      }: {
        data: Pick<User, "id" | "favourites">
        error: string | null
      } = await sendToBackground({
        name: "fetchUserFavourites",
        body: { jwt: userSession.jwt, id: userSession.id }
      })
      if (error) return showBoundary(error)

      setFavouritesList(data.favourites)
    }

    getFavourites()
  }, [setFavouritesList])

  return (
    <div className="page favourites-page">
      <BurgerMenu />
      <main className="grid">
        <div className="favourites-page--toggle-pair">
          <ToggleSwitch
            clickHandler={handleToggleSwitch}
            isChecked={isEditing}
          />
          <p className="bold uppercase">edit favourites</p>
        </div>
        <p className="bold uppercase favourites-page--title">
          favourites
        </p>

        {favouritesList && (
          <div className="favourites-page--favourites-grid">
            {favouritesList.map(favourite => (
              <div key={favourite.id}>
                <PopupCard popup={favourite} />
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
