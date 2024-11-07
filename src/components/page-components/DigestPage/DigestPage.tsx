import { useEffect, useState } from "react"
import { useErrorBoundary } from "react-error-boundary"

import "./DigestPage.css"

import { sendToBackground } from "@plasmohq/messaging"

import BurgerMenu from "~components/BurgerMenu/BurgerMenu"
import EventCard from "~components/EventCard/EventCard"
import Footer from "~components/Footer/Footer"
import type { FullProject } from "~types/projectTypes"

export default function DigestPage() {
  const [events, setEvents] = useState<
    FullProject["sequence"] | null
  >(null)
  const { showBoundary } = useErrorBoundary()

  useEffect(() => {
    const getEvents = async () => {
      const {
        data,
        error
      }: { data: FullProject["sequence"]; error: string | null } =
        await sendToBackground({
          name: "fetchProjectDigest"
        })

      if (error) showBoundary(error)

      setEvents(data)
    }

    getEvents()
  }, [])

  return (
    <div className="digest-page page">
      <BurgerMenu />
      <main className="digest-page--main grid">
        <div className="flex flex-column">
          {events &&
            events.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
