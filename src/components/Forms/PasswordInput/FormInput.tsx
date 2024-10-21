import { ErrorMessage, Field } from "formik"

const FormInput = ({
  name,
  placeholder,
  type,
  isDisabled
}: {
  name: string
  placeholder: string
  type: "text" | "email" | "date" | "time"
  isDisabled?: boolean
}) => {
  return (
    <>
      <Field
        name={name}
        type={type}
        placeholder={placeholder}
        className="content-box shadow form--input"
        disabled={isDisabled}
      />
      <ErrorMessage name={name} className="margin-top-sm" />
    </>
  )
}

export default FormInput
