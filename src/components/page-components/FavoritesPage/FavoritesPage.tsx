import { useEffect, useState } from "react"

import "./FavoritesPage.css"

import { useErrorBoundary } from "react-error-boundary"

import { sendToBackground } from "@plasmohq/messaging"

import BurgerMenu from "~components/BurgerMenu/BurgerMenu"
import Footer from "~components/Footer/Footer"
import ToggleSwitch from "~components/ToggleSwitch/ToggleSwitch"
import type { Popup } from "~types/eventTypes"
import type { User, UserSession } from "~types/userTypes"
import newStorage from "~utils/newStorage"

export default function FavoritesPage() {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const { showBoundary } = useErrorBoundary()
  const [favoritesList, setFavoritesList] = useState<Array<Popup>>([])
  const storage = newStorage()

  const handleToggleSwitch = () => {
    setIsEditing(previous => !previous)
  }

  useEffect(() => {
    const getFavorites = async () => {
      const userSession: UserSession = await storage.get(
        "arebyte-audience-session"
      )

      const { data, error }: { data: User; error: string | null } =
        await sendToBackground({
          name: "fetchUserProfile",
          body: { jwt: userSession.jwt, id: userSession.id }
        })
      if (error) return showBoundary(error)

      setFavoritesList(data.favourites)
    }

    getFavorites()
  }, [setFavoritesList])

  return (
    <div className="page favorites-page">
      <BurgerMenu />
      <main className="grid">
        <div className="favorites-page--toggle-pair">
          <ToggleSwitch
            clickHandler={handleToggleSwitch}
            isChecked={isEditing}
          />
          <p className="bold uppercase">edit favourites</p>
        </div>
        <p className="bold uppercase favorites-page--title">
          favourites
        </p>

        {favoritesList && (
          <div className="favorites-page--favorites-grid">
            {favoritesList.map(popup => (
              <div key={popup.id}>{popup.artist_name}</div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
