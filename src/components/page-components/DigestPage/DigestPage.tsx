import { useEffect, useState } from "react"
import { useErrorBoundary } from "react-error-boundary"

import { sendToBackground } from "@plasmohq/messaging"

import BurgerMenu from "~components/BurgerMenu/BurgerMenu"
import Footer from "~components/Footer/Footer"
import type { EventData } from "~types/eventTypes"
import { ProjectData } from "~types/projectTypes"

export default function DigestPage() {
  const [events, setEvents] = useState<
    Omit<EventData, "pop_ups">[] | null
  >(null)
  const { showBoundary } = useErrorBoundary()

  useEffect(() => {
    const getEvents = async () => {
      const {
        data,
        error
      }: { data: ProjectData; error: string | null } =
        await sendToBackground({
          name: "fetchListForDigest"
        })

      if (error) showBoundary(error)

      setEvents(data.sequence)
    }

    getEvents()
  }, [])

  return (
    <div className="digest-page page">
      <BurgerMenu />
      <main className="grid">
        {events &&
          events.map(event => (
            <div key={event.id}>{event.title}</div>
          ))}
      </main>
      <Footer />
    </div>
  )
}
