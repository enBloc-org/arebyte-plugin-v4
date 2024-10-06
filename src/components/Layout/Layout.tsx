import type { ReactNode } from "react"

import "./Layout.css"

export default function Layout({
  children,
  theme
}: {
  children: ReactNode,
  theme:"logged-in"|"logged-out"
}) {
  return (
    <div className="layout" data-theme={theme}>
      {children}
    </div>
  )
}
