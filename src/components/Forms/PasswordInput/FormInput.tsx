import { ErrorMessage, Field } from "formik"

const FormInput = ({
  name,
  placeholder,
  type
}: {
  name: string
  placeholder: string
  type: "text" | "email" | "date"
}) => {
  return (
    <>
      <Field
        name={name}
        type={type}
        placeholder={placeholder}
        className="content-box shadow form--input"
      />
      <ErrorMessage name={name} className="margin-top-sm" />
    </>
  )
}

export default FormInput
