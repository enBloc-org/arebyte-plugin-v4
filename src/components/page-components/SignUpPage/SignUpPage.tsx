import * as Yup from "yup"

import BackButton from "~components/BackButton/BackButton"
import Footer from "~components/Footer/Footer"

import "./SignUpPage.css"

import { Form, Formik } from "formik"
import { useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"

import FormInput from "~components/Forms/PasswordInput/FormInput"
import PasswordInput from "~components/Forms/PasswordInput/PasswordInput"

// import useStore from "~store/store"

const SignUpPage = () => {
  // const navigateTo = useStore.use.navigateTo()
  const [errorMessage, setErrorMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const initialValues = {
    username: "",
    identifier: "",
    password: "",
    passwordCheck: "",
    location: "",
    dateOfBirth: new Date()
  }

  return (
    <div className="sign-up-page page background__stripped">
      <BackButton />
      <main>
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object({
            username: Yup.string()
              .max(15, "Must be 15 characters or less")
              .required("Required"),
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
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
            passwordCheck: Yup.string()
              .oneOf([Yup.ref("password")], "Passwords must match")
              .required("Please confirm your password"),
            location: Yup.string().required(
              "Please enter your location"
            )
          })}
          onSubmit={async (values, actions) => {
            setIsLoading(true)
            setErrorMessage("")
            const { data, error } = await sendToBackground({
              name: "createNewUser",
              body: JSON.stringify(values)
            })

            if (error) {
              setErrorMessage(error)
              setIsLoading(false)
              return actions.setSubmitting(false)
            }

            console.log("====================================")
            console.log(data)
            console.log("====================================")

            actions.setSubmitting(false)
            setIsLoading(false)
          }}
        >
          <Form className="form--container stack">
            <legend className="bold">SIGN UP</legend>
            <FormInput
              name="username"
              placeholder="Username*"
              type="text"
            />
            <FormInput
              name="email"
              placeholder="Email*"
              type="email"
            />
            <PasswordInput name="password" placeholder="Password*" />
            <PasswordInput
              name="passwordCheck"
              placeholder="Re-enter password*"
            />
            <FormInput
              name="location"
              placeholder="Location*"
              type="text"
            />
            <button
              type="submit"
              className="button--primary text-md"
              disabled={isLoading}
            >
              Submit
            </button>
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

export default SignUpPage
