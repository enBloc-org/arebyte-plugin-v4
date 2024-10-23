import { useState } from "react"

import "./FavoritesPage.css"

import BurgerMenu from "~components/BurgerMenu/BurgerMenu"
import Footer from "~components/Footer/Footer"
import ToggleSwitch from "~components/ToggleSwitch/ToggleSwitch"

export default function FavoritesPage() {
  const [isEditing, setIsEditing] = useState<boolean>(false)

  const handleToggleSwitch = () => {
    setIsEditing(previous => !previous)
  }

  return (
    <div className="page favorites-page">
      <BurgerMenu />
      <main className="grid">
        <div className='favorites-page--toggle-pair'>
          <ToggleSwitch
            clickHandler={handleToggleSwitch}
            isChecked={isEditing}
          />
          <p className="bold uppercase">edit favourites</p>
        </div>
        <p className="bold uppercase favorites-page--title">
          favourites
        </p>
        <div className="favorites-page--favorites-grid">
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
          <div>6</div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
