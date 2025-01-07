import { Form, Formik } from "formik"
import { useState } from "react"
import * as Yup from "yup"

import { sendToBackground } from "@plasmohq/messaging"

import BackButton from "~components/BackButton/BackButton"
import Footer from "~components/Footer/Footer"
import PasswordInput from "~components/Forms/PasswordInput/PasswordInput/PasswordInput"

import "./ChangePasswordPage.css"

import useStore from "~store/store"
import { AuthData } from "~types/userTypes"

const initialValues = {
  currentPassword: "",
  password: "",
  passwordConfirmation: ""
}
const ChangePasswordPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const navigateTo = useStore.use.navigateTo()

  return (
    <div className="change-password-page page background__stripped">
      <BackButton />
      <main>
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object({
            currentPassword: Yup.string().min(
              8,
              "Password must be at least 8 characters"
            ),
            password: Yup.string()
              .min(8, "Password must be at least 8 characters")
              .matches(
                /[a-z]/,
                "Password must contain at least one lowercase letter"
              )
              .matches(
                /[A-Z]/,
                "Password must contain at least one uppercase letter"
              )
              .matches(
                /[0-9]/,
                "Password must contain at least one number"
              )
              .matches(
                /[^a-zA-Z0-9]/,
                "Password must contain at least one special character"
              )
              .required("Password is required"),
            passwordConfirmation: Yup.string()
              .oneOf([Yup.ref("password")], "Passwords must match")
              .required("Please confirm your password")
          })}
          onSubmit={async (values, actions) => {
            setIsLoading(true)
            setErrorMessage("")
            const {
              data,
              error
            }: { data: AuthData; error: string | null } =
              await sendToBackground({
                name: "changePassword",
                body: {
                  currentPassword: values.currentPassword,
                  password: values.password,
                  passwordConfirmation: values.passwordConfirmation
                }
              })
            if (error) {
              setErrorMessage(error)
              setIsLoading(false)
              return actions.setSubmitting(false)
            }
            if (data) {
              actions.setSubmitting(false)
              setIsLoading(false)
              navigateTo("profile")
            }
          }}
        >
          <Form className="form--container stack">
            <legend className="bold">RESET PASSWORD</legend>
            <PasswordInput
              name="currentPassword"
              placeholder="Current Password*"
            />
            <PasswordInput name="password" placeholder="Password*" />
            <PasswordInput
              name="passwordConfirmation"
              placeholder="Re-enter password*"
            />

            <div className="flex sign-up--buttons">
              <button
                type="submit"
                className="button--primary text-md"
                disabled={isLoading}
              >
                Submit
              </button>
            </div>
          </Form>
        </Formik>
        {isLoading && (
          <p className="message margin-top-sm text-lg">Loading</p>
        )}
        {errorMessage && (
          <p className="message__error margin-top-sm text-lg">
            {errorMessage}
          </p>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default ChangePasswordPage
