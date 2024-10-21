import Browser from "webextension-polyfill"

import calculatePopupCoordinates from "./calculatePopupCoordinates"
import parseImageSize from "./parseImageSize"

const backgroundPopupCreate = async popups => {
  const screenDimensions = await Browser.tabs
    .query({ active: true, currentWindow: true })
    .then(tabs =>
      Browser.tabs.sendMessage(tabs[0].id, {
        action: "getScreenDimensions"
      })
    )
  const { width: screenWidth, height: screenHeight } =
    screenDimensions as { width: number; height: number }

  popups.forEach(async popup => {
    const { height, width, url } = parseImageSize(popup)

    const { top, left } = calculatePopupCoordinates(
      popup,
      screenHeight,
      screenWidth,
      width,
      height
    )

    const popupWindow = await Browser.windows.create({
      url: `/tabs/newTab.html?url=${url}&width=${width}&height=${height}`,
      type: "popup",
      width: width,
      height: height,
      state: "normal",
      top: Math.floor(top),
      left: Math.floor(left)
    })

    if (
      popupWindow.width !== width ||
      popupWindow.height !== height
    ) {
      await Browser.windows.update(popupWindow.id, {
        width: Math.floor(width),
        height: Math.floor(height)
      })
    }
  })
}

export default backgroundPopupCreate
