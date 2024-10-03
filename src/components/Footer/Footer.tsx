import { sendToBackground } from "@plasmohq/messaging"

import "./Footer.css"

const Footer = () => {
  const triggerPopups = async () => {
    await sendToBackground({
      name: "triggerPopup",
      body: {
        id: 1
      }
    })
  }

  return (
    <footer className="footer">
      <button onClick={triggerPopups}>Trigger Popups</button>
      <p>arebyte Official Plugin</p>
    </footer>
  )
}

export default Footer
