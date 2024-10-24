/**
 * @description Determine the format of a file based on its extension
 * @param {string} ext - the file extension
 * @returns {string} - the type of file
 */

const determineFormat = (
  ext: string | undefined
): "image" | "video" | "unknown" => {
  const cleanedExt = ext?.replace(/^\./, "")

  const imageExtensions = [
    "jpg",
    "jpeg",
    "png",
    "gif",
    "bmp",
    "webp",
    "svg"
  ]
  const videoExtensions = ["mp4", "mpeg", "webm", "mov"]

  if (imageExtensions.includes(cleanedExt)) {
    return "image"
  } else if (videoExtensions.includes(cleanedExt)) {
    return "video"
  } else {
    return null
  }
}

export default determineFormat
