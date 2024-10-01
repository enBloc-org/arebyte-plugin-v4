import type { ReactNode } from "react"

import "./Layout.css"

export default function Layout({
  children
}: {
  children: ReactNode
}) {
  return (
    <div className="layout">
      {children}
    </div>
  )
}
