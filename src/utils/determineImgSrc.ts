/*
 * This function determines the image source based on the environment.
 * If the environment is development, it will use the public API URL.
 * Otherwise, it will use the image URL.
 * @param {string} img - The image URL.
 */

const determineImgSrc = (img: string): string => {
  const imgString =
    process.env.NODE_ENV === "development"
      ? process.env.PLASMO_PUBLIC_API_URL + img
      : img
  return imgString
}

export default determineImgSrc
