import { Form, Formik } from "formik"
import "./PasswordRecoveryPage.css"

import { useState } from "react"
import * as Yup from "yup"

import { sendToBackground } from "@plasmohq/messaging"

import BackButton from "~components/BackButton/BackButton"
import Footer from "~components/Footer/Footer"
import FormInput from "~components/Forms/PasswordInput/FormInput"

interface PasswordResetData {
  ok?: boolean
  error?: string
}

export default function PasswordRecoveryPage() {
  const [errorMessage, setErrorMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="password-recovery-page page background__stripped">
      <BackButton />
      <main>
        <Formik
          initialValues={{
            email: ""
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .min(6, "Must be longer then 6 characters")
              .email("Invalid email address")
              .required("Required")
          })}
          onSubmit={async (values, actions) => {
            setErrorMessage("")
            setIsLoading(true)
            const data: PasswordResetData = await sendToBackground({
              name: "passwordRecovery",
              body: JSON.stringify(values)
            })

            if (data.error) {
              setIsLoading(false)
              setErrorMessage(data.error)
              return actions.setSubmitting(false)
            }

            if (data.ok) setErrorMessage("Please check your email")
            setIsLoading(false)
            return actions.setSubmitting(false)
          }}
        >
          <Form className="form--container margin-top-lg">
            <legend className="bold">Forgot your password? Please enter your email.</legend>
            <FormInput
              name="email"
              placeholder="Email*"
              type="email"
            />
            <div className="flex login--buttons">
              <button
                type="submit"
                className="button--primary text-md"
                disabled={isLoading}
              >
                submit
              </button>
            </div>
          </Form>
        </Formik>
        {isLoading && (
          <span className="message text-lg">Loading ...</span>
        )}
        {errorMessage && (
          <p className="message message__error text-lg margin-top-lg">
            {errorMessage}
          </p>
        )}
      </main>
      <Footer />
    </div>
  )
}
