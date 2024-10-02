import type { PlasmoMessaging } from "@plasmohq/messaging"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const response = await fetch(
    `${process.env.PLASMO_PUBLIC_API_URL}/api/auth/local`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: req.body
    }
  )
  const data = await response.json()
  res.send(data)
}

export default handler
