import { BlocksRenderer } from "@strapi/blocks-react-renderer"
import { useEffect, useState } from "react"
import { useErrorBoundary } from "react-error-boundary"

import "./AboutPage.css"

import { sendToBackground } from "@plasmohq/messaging"

import BackButton from "~components/BackButton/BackButton"
import type { AboutPage } from "~types/baseTypes"

export default function AboutPage() {
  const [content, setContent] = useState<AboutPage | undefined>(
    undefined
  )
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

      setContent(data)
    }

    getContent()
  }, [])

  return (
    <div className="about-page page">
      <main className="grid">
        <BackButton />
        {content && (
          <div className="about-page--content content-box shadow stack">
            <section>
              <p className="bold text-md">About</p>
              <p className="bold text-md">{content.abstract}</p>
            </section>
            <section>
              <BlocksRenderer content={content.description} />
            </section>
          </div>
        )}
        <div className="about-page--credits content-box shadow stack">
          <p className="bold">Credits</p>
          <p className="bold">
            Powered by <a href="https://www.arebyte.com/">arebyte</a>,
            2024
          </p>
          <p className="bold">
            Plugin Design and Development by enBloc
          </p>
          <p className="bold">all rights reserved to arebyte 2024</p>
        </div>
      </main>
    </div>
  )
}
