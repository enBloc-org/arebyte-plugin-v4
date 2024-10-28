import { useEffect, useState } from "react"

import "./FavouritesPage.css"

import { useErrorBoundary } from "react-error-boundary"

import { sendToBackground } from "@plasmohq/messaging"

import BurgerMenu from "~components/BurgerMenu/BurgerMenu"
import Footer from "~components/Footer/Footer"
import PaginationNav from "~components/PaginationNav/PaginationNav"
import PopupCard from "~components/PopupCard/PopupCard"
import ToggleSwitch from "~components/ToggleSwitch/ToggleSwitch"
import { Meta } from "~types/baseTypes"
import type { Favourite } from "~types/eventTypes"
import type { UserFavourites, UserSession } from "~types/userTypes"
import newStorage from "~utils/newStorage"

export default function FavouritesPage() {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const { showBoundary } = useErrorBoundary()
  const [favouritesList, setFavouritesList] = useState<
    Array<Favourite>
  >([])
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageCount, setPageCount] = useState<number>(1)
  const storage = newStorage()

  const handleToggleSwitch = () => {
    setIsEditing(previous => !previous)
  }

  const handlePopupRemove = async givenId => {
    const updatedFavourites = favouritesList.filter(
      favourite => favourite.id !== givenId
    )

    const { error }: { error: string | null } =
      await sendToBackground({
        name: "updateUserDetails",
        body: { favourites: updatedFavourites }
      })

    if (error) return showBoundary(error)

    setFavouritesList(updatedFavourites)
  }

  useEffect(() => {
    const getFavourites = async () => {
      const userSession: UserSession = await storage.get(
        "arebyte-audience-session"
      )

      const {
        data: favouritesData,
        error: favouritesError
      }: {
        data: UserFavourites
        error: string | null
      } = await sendToBackground({
        name: "fetchUserFavourites",
        body: {
          jwt: userSession.jwt,
          id: userSession.id
        }
      })

      if (favouritesError)
        return showBoundary(
          "Something went wrong. Please try again later."
        )

      const targetArray: number[] = favouritesData.favourites.map(
        favourite => favourite.id
      )
      const {
        data: popupData,
        error: popupError,
        meta
      }: {
        data: Favourite[]
        error: string | null
        meta: Meta
      } = await sendToBackground({
        name: "fetchListOfPopups",
        body: {
          page: pageNumber,
          popupArray: targetArray
        }
      })

      if (popupError) return showBoundary(popupError)

      setPageCount(meta.pagination.pageCount)
      setFavouritesList(popupData)
    }

    getFavourites()
  }, [setFavouritesList, pageNumber])

  const navigateToNext = () => {
    setPageNumber(page => page + 1)
  }

  const navigateToPrevious = () => {
    setPageNumber(page => page - 1)
  }

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
                <PopupCard
                  popup={favourite}
                  isEditing={isEditing}
                  removeButtonHandler={() =>
                    handlePopupRemove(favourite.id)
                  }
                />
              </div>
            ))}
          </div>
        )}
      </main>
      <PaginationNav
        pageNumber={pageNumber}
        pageCount={pageCount}
        incrementPage={navigateToNext}
        decrementPage={navigateToPrevious}
      />
      <Footer />
    </div>
  )
}
