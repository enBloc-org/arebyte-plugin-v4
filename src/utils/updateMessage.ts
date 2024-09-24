// dependencies
import { sendToBackground } from "@plasmohq/messaging"

export default async function fetchNewMessage(): Promise<string> {
  const result = await sendToBackground({ name: "set_context" })
  return result.message
}
