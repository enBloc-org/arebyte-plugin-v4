import Browser from "webextension-polyfill"

import calculatePopupCoordinates from "./calculatePopupCoordinates"
import parseImageSize from "./parseImageSize"

const backgroundPopupCreate = async popups => {
  const currentWindow = await Browser.windows.getCurrent()
  const screenHeight = currentWindow.height
  const screenWidth = currentWindow.width

  popups.forEach((popup, index) => {
    const { height, width, url } = parseImageSize(popup)

    const { top, left } = calculatePopupCoordinates(
      popup,
      screenHeight,
      screenWidth,
      width,
      height
    )

    setTimeout(() => {
      Browser.windows.create({
        url: `/tabs/newTab.html?url=${url}&width=${width}&height=${height}`,
        type: "popup",
        width: width,
        height: height,
        top: Math.floor(top),
        left: Math.floor(left)
      })
    }, index * 1000)
  })
}

export default backgroundPopupCreate
