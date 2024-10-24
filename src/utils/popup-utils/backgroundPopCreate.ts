import Browser from "webextension-polyfill"

import type {
  MediaContent,
  Popup,
  SlimPopup
} from "~types/eventTypes"

import calculatePopupCoordinates from "./calculatePopupCoordinates"
import createWindow from "./createWindow"
import determineFormat from "./determineFormat"
import parseImageSize from "./parseImageSize"
import parseWindowSize from "./parseWindowSize"

const backgroundPopupCreate = async (popups: Popup[]) => {
  // Get system widow size
  const screenDimensions = await Browser.tabs
    .query({ active: true, currentWindow: true })
    .then(tabs =>
      Browser.tabs.sendMessage(tabs[0].id, {
        action: "getScreenDimensions"
      })
    )
  const { width: screenWidth, height: screenHeight } =
    screenDimensions as { width: number; height: number }

  const slimPopups: SlimPopup[] = []

  popups.forEach(async (popup: Popup, index: number) => {
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

      slimPopups.push({
        type: "text",
        index: index,
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
      })
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
          slimPopups.push({
            type: "image",
            index: index,
            popupInfo: {
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
          })
          break
        }
        case "video":
          {
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
            slimPopups.push({
              type: "video",
              index: index,
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
            })
          }
          break
        default:
          console.log("No format found")
      }
    }
  })

  //Set popups to storage
  await Browser.storage.session.set({ arebytePopups: slimPopups })

  // Create windows
  slimPopups.forEach(async popup => {
    await createWindow(
      popup.index,
      popup.width,
      popup.height,
      popup.top,
      popup.left
    )
  })
}

export default backgroundPopupCreate
