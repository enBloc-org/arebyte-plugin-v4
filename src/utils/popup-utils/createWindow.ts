import Browser from "webextension-polyfill"

/**
 *
 * @description Create a new pop up window
 * @param {number} index - the index of the pop up
 * @param {number} width - the width of the pop up
 * @param {number} height - the height of the pop up
 * @param {number} top - the top position of the pop up
 * @param {number} left - the left position of the pop up
 * @param {string} url - the url of the pop up (optional)
 */

const createWindow = async (
  index: number,
  width: number,
  height: number,
  top: number,
  left: number,
  url?: string
) => {
  try {
    const popupWindow = await Browser.windows.create({
      url: `/tabs/newTab.html?&width=${width}&height=${height}&index=${index}&url=${url}`,
      type: "popup",
      width: width,
      height: height,
      state: "normal",
      top: Math.floor(top),
      left: Math.floor(left)
    })
    if (!popupWindow) throw new Error("Failed to create window")
    if (
      popupWindow.width !== width ||
      popupWindow.height !== height
    ) {
      await Browser.windows.update(popupWindow.id, {
        width: Math.floor(width),
        height: Math.floor(height)
      })
    }
    return popupWindow
  } catch (error) {
    console.error(`Error in createWindow: ${error}`)
  }
}

export default createWindow
