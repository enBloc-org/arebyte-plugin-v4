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
    return (
      <div className="with-loading--container">
        <img className="with-loading__loading" src={logo} />
      </div>
    )

  return <div>{children}</div>
}
