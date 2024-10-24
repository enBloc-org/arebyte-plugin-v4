import type { MediaContent } from "~types/eventTypes"

/**
 * @description Parse the size of an image
 *@param {size} size - the size of the popup
 * @param {popupContent} popupContent - the content of the popup
 * @returns {object} - the width, height, and url of the image
 */

const parseImageSize = (
  size: "Small" | "Medium" | "Large",
  popupContent: MediaContent
): { width: number; height: number; url: string } => {
  const sizeStr = size.toLowerCase().trim()
  const format = popupContent[0].media.formats[sizeStr]

  const imageSize = {
    height: format?.height ?? popupContent[0].media.height,
    width: format?.width ?? popupContent[0].media.width,
    url: format?.url ?? popupContent[0].media.url
  }

  return imageSize
}

export default parseImageSize
