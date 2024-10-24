import { useEffect, useState } from "react"

import "./NewTab.css"

import { BlocksRenderer } from "@strapi/blocks-react-renderer"
import Browser from "webextension-polyfill"

import { SlimPopup } from "~types/eventTypes"

const NewTab = () => {
  const params = new URLSearchParams(window.location.search)
  const index = params.get("index")
  const [popup, setPopup] = useState<SlimPopup>()
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
    <div style={{ width: "100%", height: "100%" }}>
      {popup && (
        <>
          {popup.type === "text" && (
            <>
              <h1>{popup.popupInfo.work_title}</h1>
              <BlocksRenderer content={popup.text_content} />
              <h1>{popup.popupInfo.work_title}</h1>
              <BlocksRenderer content={popup.text_content} />
            </>
          )}
          {popup.type === "image" && (
            <img
              src={
                process.env.NODE_ENV === "development"
                  ? "http://localhost:1337" + popup.url
                  : popup.url
              }
              alt="an image"
              className="video-container"
            />
          )}
          {popup.type === "video" && (
            <div className="video-container">
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
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default NewTab
