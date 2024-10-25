import { useEffect, useState } from "react"

import "./NewTab.css"

import { BlocksRenderer } from "@strapi/blocks-react-renderer"
import Browser from "webextension-polyfill"

import PopupInfo from "~components/popup-components/PopupInfo/PopupInfo"
import { SlimPopup } from "~types/eventTypes"

const NewTab = () => {
  const params = new URLSearchParams(window.location.search)
  const index = params.get("index")
  const [popup, setPopup] = useState<SlimPopup>()
  const [showInfo, setShowInfo] = useState(false)
  useEffect(() => {
    const getFromStorage = async () => {
      const { arebytePopups } = await Browser.storage.session.get([
        "arebytePopups"
      ])
      setPopup(arebytePopups[index])
    }
    getFromStorage()
  }, [])

  const clickHandler = () => {
    setShowInfo(prev => !prev)
  }
  return (
    <>
      {popup && (
        <div className="tab__container">
          {popup.type === "text" && (
            <div className="content--container">
              <button
                onClick={clickHandler}
                className="show--info__button"
                aria-expanded={showInfo}
              >
                INFO
              </button>
              <div className="text--content">
                <BlocksRenderer content={popup.text_content} />
              </div>
              {showInfo && (
                <PopupInfo
                  popup={popup}
                  clickHandler={clickHandler}
                />
              )}
            </div>
          )}
          {popup.type === "image" && (
            <div className="content--container">
              <button
                onClick={clickHandler}
                className="show--info__button"
                aria-expanded={showInfo}
              >
                INFO
              </button>
              <img
                src={
                  process.env.NODE_ENV === "development"
                    ? "http://localhost:1337" + popup.url
                    : popup.url
                }
                alt={popup.alt}
              />
              {showInfo && (
                <PopupInfo
                  popup={popup}
                  clickHandler={clickHandler}
                />
              )}
            </div>
          )}
          {popup.type === "video" && (
            <div className="content--container">
              <button
                onClick={clickHandler}
                className="show--info__button"
                aria-expanded={showInfo}
              >
                INFO
              </button>
              <video
                src={
                  process.env.NODE_ENV === "development"
                    ? "http://localhost:1337" + popup.url
                    : popup.url
                }
                muted
                controls
              />
              {showInfo && (
                <PopupInfo
                  popup={popup}
                  clickHandler={clickHandler}
                />
              )}
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default NewTab
