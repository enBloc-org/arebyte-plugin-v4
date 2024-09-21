import { sendToBackground } from "@plasmohq/messaging"

export default async function updateMessage(): Promise<string> {
  const result = await sendToBackground({ name: "set_context" })
  return result.message
}
