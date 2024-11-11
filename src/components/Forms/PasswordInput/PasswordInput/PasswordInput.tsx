import { ErrorMessage, Field } from "formik"
import { useState } from "react"

import EyeIcon from "~components/Icons/EyeIcon"
import SlashedEyeIcon from "~components/Icons/SlashedEyeIcon"

import "./PasswordInput.css"

const PasswordInput = ({
  name,
  placeholder
}: {
  name: string
  placeholder: string
}) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="form-input--container">
      <Field
        name={name}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        className="content-box shadow form--input"
      />

      <button
        type="button"
        className="password-toggle-btn"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? (
          <SlashedEyeIcon width="16px" height="16px" />
        ) : (
          <EyeIcon width="16px" height="16px" />
        )}
      </button>
      <ErrorMessage name={name}>
        {msg => <p className="input-message__error">{msg.toUpperCase()}</p>}
      </ErrorMessage>
    </div>
  )
}

export default PasswordInput
