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

  return (
    <>
      {popup && (
        <div className="tab--container">
          {popup.type === "text" && (
            <div className="content--container">
              <>
                <button
                  onClick={() => setShowInfo(true)}
                  className="show-info--button"
                  aria-expanded={showInfo}
                >
                  INFO
                </button>
                <div className="text--content">
                  <BlocksRenderer content={popup.text_content} />
                </div>
              </>
              <PopupInfo
                popup={popup}
                showInfo={showInfo}
                setShowInfo={setShowInfo}
              />
            </div>
          )}
          {popup.type === "image" && (
            <div className="content--container">
              <>
                <button
                  onClick={() => setShowInfo(true)}
                  className="show-info--button"
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
              </>
              <PopupInfo
                popup={popup}
                showInfo={showInfo}
                setShowInfo={setShowInfo}
              />
            </div>
          )}
          {popup.type === "video" && (
            <div className="content--container">
              <button
                onClick={() => setShowInfo(true)}
                className="show-info--button"
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
              <PopupInfo
                popup={popup}
                showInfo={showInfo}
                setShowInfo={setShowInfo}
              />
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default NewTab
