import type { PlasmoMessaging } from "@plasmohq/messaging"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const response = await fetch("https://catfact.ninja/fact")
  const parsedResponse = await response.json()
  const message: string = parsedResponse.fact

  res.send({ message: message })
}

export default handler
