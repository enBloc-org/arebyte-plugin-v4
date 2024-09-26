import ReactDOM from "react-dom/client"

import PopupWindow from "~components/PopupWindow"

const createPopupWindows = event => {
  event.forEach((popup, index) => {
    setTimeout(() => {
      const newWindow = window.open(
        "",
        `artwindow${Math.random() + index}`,
        `width=${popup.width},height=${popup.height},top=${Math.floor(Math.random() * popup.height)},left=${Math.floor(Math.random() * popup.width)},newWindow=true`
      )
      if (newWindow) {
        newWindow.document.write(`
          <html>
            <head>
              <title>${popup.alt}</title>
            </head>
            <body>
              <div id="root"></div>
            </body>
          </html>
        `)
        const root = ReactDOM.createRoot(
          newWindow.document.getElementById("root") as HTMLElement
        )
        if (root) {
          root.render(
            <PopupWindow
              imageUrl={popup.url}
              alt={popup.alt}
              text={popup.alt}
            />
          )
        }
      }
    }, index * 1000)
  })
}

export default createPopupWindows
