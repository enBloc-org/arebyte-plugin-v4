import type { PlasmoMessaging } from "@plasmohq/messaging"

interface SuccessResponse {
  ok: boolean
}

interface ErrorDetail {
  path: string[]
  message: string
  name: string
}

interface ErrorDetails {
  errors: ErrorDetail[]
}

interface ErrorObject {
  status: number
  name: string
  message: string
  details: ErrorDetails
}

interface ErrorResponse {
  data: null
  error: ErrorObject
}

function isErrorResponse(
  response: SuccessResponse | ErrorResponse
): response is ErrorResponse {
  return "error" in response
}

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const response = await fetch(
    `${process.env.PLASMO_PUBLIC_API_URL}/api/auth/forgot-password`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: req.body
    }
  )

  const returnedData: SuccessResponse | ErrorResponse =
    await response.json()

  if (isErrorResponse(returnedData)) {
    console.error(returnedData.error.message)
    res.send({ error: returnedData.error.message })
    return
  }

  res.send(returnedData)
}

export default handler
