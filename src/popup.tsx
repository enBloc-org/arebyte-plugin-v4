import "./components/normalize.css"
import "~components/globals.css"

import { useEffect, useState } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { CSSTransition } from "react-transition-group"

import { sendToBackground } from "@plasmohq/messaging"
import { useStorage } from "@plasmohq/storage/hook"

import ErrorFallback from "~components/ErrorFallback/ErrorFallback"
import HomePage from "~components/HomePage/HomePage"
import Layout from "~components/Layout/Layout"
import AboutPage from "~components/page-components/AboutPage/AboutPage"
import CurrentProjectPage from "~components/page-components/CurrentProjectPage/CurrentProjectPage"
import ExplorePage from "~components/page-components/ExplorePage/ExplorePage"
import ExploreProjectPage from "~components/page-components/ExploreProjectPage/ExploreProjectPage"
import FavouritesPage from "~components/page-components/FavouritesPage/FavouritesPage"
import LoginPage from "~components/page-components/LoginPage/LoginPage"
import ProfilePage from "~components/page-components/ProfilePage/ProfilePage"
import SignUpPage from "~components/page-components/SignUpPage/SignUpPage"
import useStore from "~store/store"
import type { User, UserSession } from "~types/userTypes"
import newStorage from "~utils/newStorage"
import LoadingSpinner from "~components/LoadingSpinner/LoadingSpinner"

function IndexPopup() {
  const currentPage = useStore.use.currentPage()
  const isLoggedIn = useStore.use.isLoggedIn()
  const updateUser = useStore.use.updateUser()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [userSession] = useStorage<UserSession>({
    key: "arebyte-audience-session",
    instance: newStorage()
  })
  const [publicIndex] = useStorage<number>({
    key: "arebyte-public-index",
    instance: newStorage()
  })

  useEffect(() => {
    const fetchUserProfile = async () => {
      setIsLoading(true)
      if (userSession) {
        const { data, error }: { data: User; error: string | null } =
          await sendToBackground({
            name: "fetchUserProfile",
            body: { jwt: userSession.jwt, id: userSession.id }
          })
        if (error) console.error(error)
        updateUser(data)
      }
      setIsLoading(false)
    }
    fetchUserProfile()
  }, [userSession, publicIndex])

  if (isLoading) return <LoadingSpinner />
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Layout theme={isLoggedIn ? "logged-in" : "logged-out"}>
        <CSSTransition
          in={currentPage === "home"}
          timeout={500}
          classNames="home-page"
          unmountOnExit
        >
          <HomePage />
        </CSSTransition>

        <CSSTransition
          in={currentPage === "profile"}
          timeout={500}
          classNames="profile-page"
          unmountOnExit
        >
          <ProfilePage />
        </CSSTransition>

        <CSSTransition
          in={currentPage === "explore"}
          timeout={500}
          classNames="explore-page"
          unmountOnExit
        >
          <ExplorePage />
        </CSSTransition>

        <CSSTransition
          in={currentPage === "current-project"}
          timeout={500}
          classNames="current-project"
          unmountOnExit
        >
          <CurrentProjectPage />
        </CSSTransition>

        <CSSTransition
          in={currentPage === "explore-project"}
          timeout={500}
          classNames="explore-project"
          unmountOnExit
        >
          <ExploreProjectPage />
        </CSSTransition>

        <CSSTransition
          in={currentPage === "login"}
          timeout={500}
          classNames="login-page"
          unmountOnExit
        >
          <LoginPage />
        </CSSTransition>

        <CSSTransition
          in={currentPage === "sign-up"}
          timeout={500}
          classNames="sign-up-page"
          unmountOnExit
        >
          <SignUpPage />
        </CSSTransition>

        <CSSTransition
          in={currentPage === "favourites"}
          timeout={500}
          classNames="favourites-page"
          unmountOnExit
        >
          <FavouritesPage />
        </CSSTransition>

        <CSSTransition
          in={currentPage === "about"}
          timeout={500}
          classNames="about-page"
          unmountOnExit
        >
          <AboutPage />
        </CSSTransition>
      </Layout>
    </ErrorBoundary>
  )
}

export default IndexPopup
