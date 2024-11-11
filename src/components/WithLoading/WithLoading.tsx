import logo from "data-base64:assets/arebyte-Plugin-blue.png"

import "./WithLoading.css"

export default function WithLoading({ children, isLoading }) {
  if (isLoading)
    return <img className="with-loading__loading" src={logo} />

  return <div>{children}</div>
}
