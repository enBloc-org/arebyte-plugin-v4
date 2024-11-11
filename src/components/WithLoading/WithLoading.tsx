import logo from "data-base64:assets/arebyte-Plugin-blue.png"

import "./WithLoading.css"

/**
 *
 * @returns a new component that wraps the children with a loading state dynamically controlled by the isLoading boolean
 */
export default function WithLoading({
  children,
  isLoading
}: {
  children: JSX.Element
  isLoading: boolean
}) {
  if (isLoading)
    return <img className="with-loading__loading" src={logo} />

  return <div>{children}</div>
}
