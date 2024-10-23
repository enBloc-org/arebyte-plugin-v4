import Browser from "webextension-polyfill"

import type { EventData, Popup, SlimPopup } from "~types/eventTypes"

import calculatePopupCoordinates from "./calculatePopupCoordinates"
import determineFormat from "./determineFormat"
import parseImageSize from "./parseImageSize"

const createWindow = async (
  index: number,
  width: number,
  height: number,
  top: number,
  left: number,
  url?: string
) => {
  const popupWindow = await Browser.windows.create({
    url: `/tabs/newTab.html?&width=${width}&height=${height}&index=${index}&url=${url}`,
    type: "popup",
    width: width,
    height: height,
    state: "normal",
    top: Math.floor(top),
    left: Math.floor(left)
  })

  if (popupWindow.width !== width || popupWindow.height !== height) {
    await Browser.windows.update(popupWindow.id, {
      width: Math.floor(width),
      height: Math.floor(height)
    })
  }
}

const parseWindowSize = (
  size: string,
  screenWidth: number,
  screenHeight: number,
  aspectRatio: number = 16 / 9
): { width: number; height: number } => {
  const calculateWidth = (factor: number) => {
    const width = Math.floor(screenWidth * factor)
    const height = Math.floor(width / aspectRatio)
    return { width, height }
  }
  
  switch (true) {
    case /^small$/i.test(size):
      return calculateWidth(0.3)
    case /^medium$/i.test(size):
      return calculateWidth(0.5)
    case /^large$/i.test(size):
      return calculateWidth(0.75)
    default:
      return {
        width: 600,
        height: Math.floor(600 / aspectRatio)
      }
  }
}

const backgroundPopupCreate = async (event: EventData) => {
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

  event.pop_ups.forEach(async (popup: Popup, index: number) => {
    if (popup.popup_content[0].__component === "piece.text-content") {
      const size = popup.popup_size.toLowerCase()
      const { width, height } = parseWindowSize(
        popup.popup_size,
        screenWidth,
        screenHeight
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
          const { height, width, url } = parseImageSize(popup)
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
              screenWidth,
              screenHeight
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
  await Browser.storage.session.set({ popups: slimPopups })

  slimPopups.forEach(popup => {
    createWindow(
      popup.index,
      popup.width,
      popup.height,
      popup.top,
      popup.left,
      popup.url
    )
  })
}

export default backgroundPopupCreate
