import "./components/normalize.css"
import "~components/globals.css"

import { CSSTransition } from "react-transition-group"

import ExplorePage from "~components/page-components/ExplorePage/ExplorePage"
import HomePage from "~components/HomePage/HomePage"
import Layout from "~components/Layout/Layout"
import LoginPage from "~components/LoginPage/LoginPage"
import CurrentProjectPage from "~components/page-components/CurrentProjectPage/CurrentProjectPage"
import ExploreProjectPage from "~components/page-components/ExploreProjectPage/ExploreProjectPage"
import ProfilePage from "~components/ProfilePage/ProfilePage"
import useStore from "~store/store"

function IndexPopup() {
  const currentPage = useStore.use.currentPage()
  const isLoggedIn = useStore.use.isLoggedIn()

  return (
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
    </Layout>
  )
}

export default IndexPopup
