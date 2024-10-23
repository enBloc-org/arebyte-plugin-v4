import Browser from "webextension-polyfill"

/**
 *
 * @description Create a new pop up window
 * @param {number} index - the index of the pop up
 * @param {number} width - the width of the pop up
 * @param {number} height - the height of the pop up
 * @param {number} top - the top position of the pop up
 * @param {number} left - the left position of the pop up
 */

const createWindow = async (
  index: number,
  width: number,
  height: number,
  top: number,
  left: number
) => {
  const popupWindow = await Browser.windows.create({
    url: `/tabs/newTab.html?index=${index}`,
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

export default createWindow
