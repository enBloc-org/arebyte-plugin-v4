import { useEffect, useState } from "react"
import { useErrorBoundary } from "react-error-boundary"

import { sendToBackground } from "@plasmohq/messaging"

import type { AboutPage } from "~types/baseTypes"

export default function AboutPage() {
  const [content, setContent] = useState("")
  const { showBoundary } = useErrorBoundary()

  useEffect(() => {
    const getContent = async () => {
      const {
        data,
        error
      }: { data: AboutPage; error: string | null } =
        await sendToBackground({
          name: "fetchAboutContent"
        })

      if (error) return showBoundary(error)

      setContent(data.abstract)
    }

    getContent()
  }, [])

  return (
    <>
      <h1>ABOUT</h1>
      {content && <p>{content}</p>}
    </>
  )
}
