/**
 * @description Parse the size of a window
 * @param {string} size - the size of the window
 * @param {number} screenWidth - the width of the screen
 * @param {number} aspectRatio - the aspect ratio of the window, default to 16/9
 * @returns {object} - the width and height of the window
 */

const parseWindowSize = (
  size: string,
  screenWidth: number,
  aspectRatio: number = 16 / 9
): { width: number; height: number } => {
  const calculateDimensions = (factor: number) => {
    const width = Math.floor(screenWidth * factor)
    const height = Math.floor(width / aspectRatio)
    return { width, height }
  }

  switch (true) {
    case /^small$/i.test(size):
      return calculateDimensions(0.3)
    case /^medium$/i.test(size):
      return calculateDimensions(0.5)
    case /^large$/i.test(size):
      return calculateDimensions(0.75)
    default:
      return {
        width: 600,
        height: Math.floor(600 / aspectRatio)
      }
  }
}

export default parseWindowSize
