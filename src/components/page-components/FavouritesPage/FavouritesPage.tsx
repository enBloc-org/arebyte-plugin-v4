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

  const handlePopupRemove = async (givenId: number) => {
    const { error }: { error: string | null } =
      await sendToBackground({
        name: "updateUserDetails",
        body: {
          favourites: {
            disconnect: givenId
          }
        }
      })

    if (error) return showBoundary(error)

    setFavouritesList(previous =>
      previous.filter(favourite => favourite.id !== givenId)
    )
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
      if (favouritesData.favourites.length === 0) return

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
      if (meta.pagination.pageCount !== 1)
        setPageCount(meta.pagination.pageCount)

      setFavouritesList(popupData)
    }

    getFavourites()
  }, [setFavouritesList, pageNumber])

  return (
    <div className="favourites-page page">
      <BurgerMenu />
      <main className="favourites-main">
        <div className="favourites-page--toggle-pair">
          <ToggleSwitch
            clickHandler={handleToggleSwitch}
            isChecked={isEditing}
          />
          <p className="bold uppercase">edit favourites</p>
        </div>
        <section>
          <h2 className="bold uppercase favourites-page--title">
            favourites
          </h2>
          {favouritesList.length > 0 ? (
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
          ) : (
            <p className="text-lg favourites-page--message__no-favourites">
              There are no favourites available. You can mark a pop-up
              as a favourite during your next scheduled event.
            </p>
          )}
        </section>
      </main>
      <div>
        <PaginationNav
          pageNumber={pageNumber}
          pageCount={pageCount}
          setterFunction={setPageNumber}
        />
        <Footer />
      </div>
    </div>
  )
}
