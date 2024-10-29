import Browser from "webextension-polyfill"

import { MediaContent, Popup, SlimPopup } from "~types/eventTypes"

import calculatePopupCoordinates from "./calculatePopupCoordinates"
import createWindow from "./createWindow"
import determineFormat from "./determineFormat"
import parseImageSize from "./parseImageSize"
import parseWindowSize from "./parseWindowSize"

export default async function displayPopup(popup: Popup) {
  const screenHeight = window.screen.height
  const screenWidth = window.screen.width

  let slimPopup: SlimPopup

  if (popup.popup_content[0].__component === "piece.text-content") {
    const { width, height } = parseWindowSize(
      popup.popup_size,
      screenWidth
    )

    const { top, left } = calculatePopupCoordinates(
      popup,
      screenHeight,
      screenWidth,
      width,
      height
    )

    slimPopup = {
      type: "text",
      index: 0,
      popupInfo: {
        artist_name: popup.artist_name,
        medium: popup.medium,
        work_title: popup.work_title,
        creation_date: popup.creation_date,
        external_link: popup.external_link
      },
      description: popup.popup_content[0].description,
      text_content: popup.popup_content[0].text_content,
      width: width,
      height: height,
      top: top,
      left: left
    }
  }

  if (popup.popup_content[0].__component === "piece.piece") {
    switch (determineFormat(popup.popup_content[0].media.ext)) {
      case "image": {
        const { height, width, url } = parseImageSize(
          popup.popup_size,
          popup.popup_content as unknown as MediaContent
        )
        const { top, left } = calculatePopupCoordinates(
          popup,
          screenHeight,
          screenWidth,
          width,
          height
        )

        slimPopup = {
          type: "image",
          index: 0,
          popupInfo: {
            id: popup.id,
            artist_name: popup.artist_name,
            medium: popup.medium,
            work_title: popup.work_title,
            creation_date: popup.creation_date,
            external_link: popup.external_link
          },
          url: url,
          description: popup.popup_content[0].description,
          width: width,
          height: height,
          top: top,
          left: left
        }
        break
      }
      case "video": {
        const { width, height } = parseWindowSize(
          popup.popup_size,
          screenWidth
        )
        const { top, left } = calculatePopupCoordinates(
          popup,
          screenHeight,
          screenWidth,
          width,
          height
        )

        slimPopup = {
          type: "video",
          index: 0,
          popupInfo: {
            artist_name: popup.artist_name,
            medium: popup.medium,
            work_title: popup.work_title,
            creation_date: popup.creation_date,
            external_link: popup.external_link
          },
          url: popup.popup_content[0].media.url,
          description: popup.popup_content[0].description,
          width: width,
          height: height,
          top: top,
          left: left
        }
        break
      }
      default:
        console.error("Nor format found")
    }
  }

  await Browser.storage.session.set({ arebytePopups: [slimPopup] })

  await createWindow(
    slimPopup.index,
    slimPopup.width,
    slimPopup.height,
    slimPopup.top,
    slimPopup.left
  )
}
