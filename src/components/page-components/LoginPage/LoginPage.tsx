import { Form, Formik } from "formik"
import * as Yup from "yup"

import { useStorage } from "@plasmohq/storage/hook"

import useStore from "~store/store"

import "./LoginPage.css"

import { useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"

import BackButton from "~components/BackButton/BackButton"
import Footer from "~components/Footer/Footer"
import FormInput from "~components/Forms/PasswordInput/FormInput"
import PasswordInput from "~components/Forms/PasswordInput/PasswordInput/PasswordInput"
import { UserSession } from "~types/userTypes"

export default function LoginPage() {
  const navigateTo = useStore.use.navigateTo()
  const [errorMessage, setErrorMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [, setUserSession] = useStorage("arebyte-audience-session")

  return (
    <div className="login-page page background__stripped">
      <BackButton />
      <main>
        <Formik
          initialValues={{
            identifier: "",
            password: ""
          }}
          validationSchema={Yup.object({
            identifier: Yup.string()
              .min(6, "Must be longer then 6 characters")
              .email("Invalid email address")
              .required("Required"),
            password: Yup.string().required("Password is required")
          })}
          onSubmit={async (values, actions) => {
            setErrorMessage("")
            setIsLoading(true)
            const {
              jwt,
              user,
              error: authError
            } = await sendToBackground({
              name: "loginToStrapi",
              body: JSON.stringify(values)
            })

            if (authError) {
              setIsLoading(false)
              return setErrorMessage(authError)
            }
            const userSession: UserSession = {
              user: {
                ...user
              },
              jwt
            }
            setUserSession(userSession)
            navigateTo("home")
            return actions.setSubmitting(false)
          }}
        >
          <Form className="form--container stack">
            <legend className="bold">LOGIN</legend>
            <FormInput
              name="identifier"
              placeholder="Email*"
              type="email"
            />
            <PasswordInput name="password" placeholder="Password*" />
            <div className="flex login--buttons">
              <button
                type="submit"
                className="button--primary text-md"
                disabled={isLoading}
              >
                submit
              </button>
              <div className="login--account-options">
                <button>Password Recovery</button>
                <button onClick={() => navigateTo("sign-up")}>
                  No account yet? Register here
                </button>
              </div>
            </div>
          </Form>
        </Formik>
        {isLoading && (
          <span className="message text-lg">Loading ...</span>
        )}
        {errorMessage && (
          <p className="message message__error text-lg">
            {errorMessage}
          </p>
        )}
      </main>
      <Footer />
    </div>
  )
}
