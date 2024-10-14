import { useEffect, useState } from "react"
import { useErrorBoundary } from "react-error-boundary"

import {
  MessagesMetadata,
  sendToBackground
} from "@plasmohq/messaging"

type MessageState<T> = {
  isLoading: boolean
  data: T | null
}

const useMessageHandler = <T,>(
  name: keyof MessagesMetadata,
  body: MessagesMetadata[keyof MessagesMetadata]
) => {
  const [state, setState] = useState<MessageState<T>>({
    isLoading: false,
    data: null
  })

  const { showBoundary } = useErrorBoundary()

  useEffect(() => {
    const sendMessageToBackground = async () => {
      try {
        setState(prev => ({ ...prev, isLoading: true }))
        const response = await sendToBackground({
          name: name,
          body: body
        })
        setState({ data: response, isLoading: false })
      } catch (error) {
        showBoundary(error)
        setState(prev => ({ ...prev, isLoading: false }))
      }
    }
    sendMessageToBackground()
  }, [])

  return { ...state }
}

export default useMessageHandler
