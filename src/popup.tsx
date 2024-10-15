import "./components/normalize.css"
import "~components/globals.css"

import { useEffect } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { CSSTransition } from "react-transition-group"

import { useStorage } from "@plasmohq/storage/hook"

import ErrorFallback from "~components/ErrorFallback/ErrorFallback"
import HomePage from "~components/HomePage/HomePage"
import Layout from "~components/Layout/Layout"
import LoginPage from "~components/LoginPage/LoginPage"
import CurrentProjectPage from "~components/page-components/CurrentProjectPage/CurrentProjectPage"
import ExplorePage from "~components/page-components/ExplorePage/ExplorePage"
import ExploreProjectPage from "~components/page-components/ExploreProjectPage/ExploreProjectPage"
import SignUpPage from "~components/page-components/SignUpPage/SignUpPage"
import ProfilePage from "~components/ProfilePage/ProfilePage"
import useStore from "~store/store"
import { UserSession } from "~types/userTypes"
import newStorage from "~utils/newStorage"

function IndexPopup() {
  const currentPage = useStore.use.currentPage()
  const isLoggedIn = useStore.use.isLoggedIn()
  const updateUser = useStore.use.updateUser()

  const [userSession] = useStorage<UserSession>({
    key: "arebyte-audience-session",
    instance: newStorage()
  })

  useEffect(() => {
    if (userSession) updateUser(userSession)
  }, [userSession?.jwt])

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
      </Layout>
    </ErrorBoundary>
  )
}

export default IndexPopup
