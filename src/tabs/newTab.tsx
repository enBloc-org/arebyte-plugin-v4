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
        <div style={{ width: popup.width, height: popup.height }} className="tab__container">
          {popup.type === "text" && (
            <>
              <button
                onClick={clickHandler}
                className="show--info__button"
              >
                INFO
              </button>
              <BlocksRenderer content={popup.text_content} />
              {showInfo && (
                <PopupInfo
                  popup={popup}
                  clickHandler={clickHandler}
                />
              )}
            </>
          )}
          {popup.type === "image" && (
            <>
              <button
                onClick={clickHandler}
                className="show--info__button"
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
            </>
          )}
          {popup.type === "video" && (
            <div className="video-container">
              <button
                onClick={clickHandler}
                className="show--info__button"
              >
                INFO
              </button>
              <video
                src={
                  process.env.NODE_ENV === "development"
                    ? "http://localhost:1337" + popup.url
                    : popup.url
                }
                autoPlay
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
