import type { PlasmoMessaging } from "@plasmohq/messaging"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const response = await fetch("https://catfact.ninja/fact")
  const message = await response.json()

  res.send({ message: message.fact })
}

export default handler
