import { useEffect, useState } from "react"

import "./NewTab.css"

import { BlocksRenderer } from "@strapi/blocks-react-renderer"
import Browser from "webextension-polyfill"

import { SlimPopup } from "~types/eventTypes"

const NewTab = () => {
  const params = new URLSearchParams(window.location.search)
  const width = params.get("width")
  const height = params.get("height")
  const url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:1337" + params.get("url")
      : params.get("url")
  const index = params.get("index")
  const [popup, setPopup] = useState<SlimPopup>()
  useEffect(() => {
    const getFromStorage = async () => {
      const { popups } = await Browser.storage.session.get(["popups"])
      setPopup(popups[index])
    }
    getFromStorage()
  }, [])
  return (
    <div style={{ width: width, height: height }}>
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
              src={url}
              alt="an image"
              style={{ width: width, height: height }}
            />
          )}
          {popup.type === "video" && (
            <div className="video-container">
              <video src={url} autoPlay controls />
            </div>
          )}
        </>
      )}

      {/* <img
        src={url}
        alt="an image"
        style={{ width: width, height: height }}
      /> */}
    </div>
  )
}

export default NewTab
