import { Popup } from "~types/eventTypes"

/**
 * @description Calculate the top and left coordinates of a pop up
 * @param {Popup} popup - the pop up object
 * @param {number} screenHeight - the height of the screen
 * @param {number} screenWidth - the width of the screen
 * @param {number} popupWidth - the width of the pop up
 * @param {number} popupHeight - the height of the pop up
 * @returns {Object} - the top and left coordinates of the pop up
 */

const calculatePopupCoordinates = (
  popup: Popup,
  screenHeight: number,
  screenWidth: number,
  popupWidth: number,
  popupHeight: number
): { top: number; left: number } => {
  let top: number, left: number

  switch (true) {
    case /^\s*top\s*right\s*$/i.test(popup.popup_position):
      top = 0
      left = screenWidth - popupWidth
      break
    case /^\s*top\s*center\s*$/i.test(popup.popup_position):
      top = 0
      left = (screenWidth - popupWidth) / 2
      break
    case /^\s*top\s*left\s*$/i.test(popup.popup_position):
      top = 0
      left = 0
      break
    case /^\s*center\s*right\s*$/i.test(popup.popup_position):
      top = (screenHeight - popupHeight) / 2
      left = screenWidth - popupWidth
      break
    case /^\s*center\s*$/i.test(popup.popup_position):
      top = (screenHeight - popupHeight) / 2
      left = (screenWidth - popupWidth) / 2
      break
    case /^\s*center\s*left\s*$/i.test(popup.popup_position):
      top = (screenHeight - popupHeight) / 2
      left = 0
      break
    case /^\s*bottom\s*right\s*$/i.test(popup.popup_position):
      top = screenHeight - popupHeight
      left = screenWidth - popupWidth
      break
    case /^\s*bottom\s*center\s*$/i.test(popup.popup_position):
      top = screenHeight - popupHeight
      left = (screenWidth - popupWidth) / 2
      break
    case /^\s*bottom\s*left\s*$/i.test(popup.popup_position):
      top = screenHeight - popupHeight
      left = 0
      break
    default:
      top = (screenHeight - popupHeight) / 2
      left = (screenWidth - popupWidth) / 2
      break
  }
  return { top, left }
}

export default calculatePopupCoordinates
