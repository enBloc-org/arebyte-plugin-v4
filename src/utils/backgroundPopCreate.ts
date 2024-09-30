import Browser from "webextension-polyfill"

const backgroundPopupCreate = async popups => {
  const currentWindow = await Browser.windows.getCurrent()
  const screenHeight = currentWindow.height
  const screenWidth = currentWindow.width

  popups.forEach((popup, index) => {
    let top: number, left: number

    const formatKey = popup.popup_size.toLowerCase().trim()
    const format = popup.popup_content[0].media.formats[formatKey]

    const height =
      format?.height ?? popup.popup_content[0].media.height

    const width = format?.width ?? popup.popup_content[0].media.width

    switch (true) {
      case /^\s*top\s*right\s*$/i.test(popup.position):
        top = 0
        left = screenWidth - width
        break
      case /^\s*top\s*center\s*$/i.test(popup.position):
        top = 0
        left = (screenWidth - width) / 2
        break
      case /^\s*top\s*left\s*$/i.test(popup.position):
        top = 0
        left = 0
        break
      case /^\s*center\s*right\s*$/i.test(popup.position):
        top = (screenHeight - height) / 2
        left = screenWidth - width
        break
      case /^\s*center\s*$/i.test(popup.position):
        top = (screenHeight - height) / 2
        left = (screenWidth - width) / 2
        break
      case /^\s*center\s*left\s*$/i.test(popup.position):
        top = (screenHeight - height) / 2
        left = 0
        break
      case /^\s*bottom\s*right\s*$/i.test(popup.position):
        top = screenHeight - height
        left = screenWidth - width
        break
      case /^\s*bottom\s*center\s*$/i.test(popup.position):
        top = screenHeight - height
        left = (screenWidth - width) / 2
        break
      case /^\s*bottom\s*left\s*$/i.test(popup.position):
        top = screenHeight - height
        left = 0
        break
      default:
        console.log("Default position")

        top = (screenHeight - height) / 2
        left = (screenWidth - width) / 2
        break
    }

    setTimeout(() => {
      Browser.windows.create({
        url: "/tabs/newTab.html",
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
