import type { Popup } from "~types/eventTypes"

/**
 * @description Parse the size of an image
 * @param {Popup} popup - the popup object
 * @returns {object} - the width, height, and url of the image
 */

const parseImageSize = (
  popup: Popup
): { width: number; height: number; url: string } => {
  const size = popup.popup_size.toLowerCase().trim()
  const format = popup.popup_content[0].media.formats[size]

  const imageSize = {
    height: format?.height ?? popup.popup_content[0].media.height,
    width: format?.width ?? popup.popup_content[0].media.width,
    url: format?.url ?? popup.popup_content[0].media.url
  }

  return imageSize
}

export default parseImageSize
