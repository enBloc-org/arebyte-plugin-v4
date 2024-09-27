const backgroundPopupCreate = event => {
  event.forEach((popup, index) => {
    setTimeout(() => {
      chrome.windows.create(
        {
          url: "/tabs/newTab.html",
          type: "popup",
          width: popup.width,
          height: popup.height,
          top: popup.top,
          left: popup.left
        },
        newWindow => {
          console.log(newWindow.id)
        }
      )
    }, index * 1000)
  })
}

export default backgroundPopupCreate
